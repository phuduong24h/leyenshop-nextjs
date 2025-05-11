pipeline {
    agent any

    parameters {
        string(name: 'BRANCH', defaultValue: 'master', description: 'Branch to build')
        string(name: 'PM2_NAME', defaultValue: 'dev.leyenshop.net', description: 'PM2 app name')
        string(name: 'WORK_DIR', defaultValue: '/root/leyenshop/dev/leyenshop-nextjs', description: 'Working directory')
        string(name: 'GITHUB_REPO_URL', defaultValue: 'https://github.com/windduongcorp/leyenshop-nextjs', description: 'GitHub repository URL')
        string(name: 'DISCORD_WEBHOOK_URL', defaultValue: 'https://discord.com/api/webhooks/1355003536361918574/tN5Yg0qm0rS8E-tqlzd9upaVHIQCAfXF1RcBeAia1hOUl7zKIV6YyHtN7cE7OTjRxv9J', description: 'Discord webhook URL for notifications')
    }

    environment {
        APP_NAME = "leyenshop"
        REPO_URL = "git@github.com:windduongcorp/leyenshop-nextjs.git"
        CREDENTIAL_ID_SSH = "GITHUB_TOKEN"
        BRANCH = "${params.BRANCH}"
        PM2_NAME = "${params.PM2_NAME}"
        WORK_DIR = "${params.WORK_DIR}"
        DISCORD_WEBHOOK_URL = "${params.DISCORD_WEBHOOK_URL}"
        GITHUB_REPO_URL = "${params.GITHUB_REPO_URL}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    if (!fileExists(WORK_DIR)) {
                        sh "git clone -b $BRANCH $REPO_URL $WORK_DIR"
                    }
                }
            }
        }

        stage('Check for Changes') {
            steps {
                script {
                    dir(WORK_DIR) {
                        sh 'git fetch origin'

                        def remoteCommit = sh(script: "git rev-parse origin/$BRANCH", returnStdout: true).trim()
                        def localCommit = sh(script: "git rev-parse HEAD || echo 'NONE'", returnStdout: true).trim()

                        if (remoteCommit == localCommit) {
                            echo "No new changes in Git. Skipping build."
                            currentBuild.result = 'ABORTED'
                            // error("No new changes")
                        } else {
                            echo "New changes detected! Proceeding with the build..."
                        }
                    }
                }
            }
        }

        stage('Pull Latest Code') {
            steps {
                dir(WORK_DIR) {
                    sh '''
                        git fetch --all
                        git reset --hard origin/$BRANCH
                    '''
                }
            }
        }

        stage('Env') {
            steps {
                script {
                    env.GIT_COMMIT = sh(
                        script: "git rev-parse HEAD",
                        returnStdout: true
                    ).trim()
                    env.GIT_COMMIT_AUTHOR = sh(
                        script: "git log -1 --pretty=format:'%an'",
                        returnStdout: true
                    ).trim()
                    env.GIT_COMMIT_MESSAGE = sh(
                        script: "git log -1 --pretty=format:'%s'",
                        returnStdout: true
                    ).trim()
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir(WORK_DIR) {
                    sh 'yarn install'
                }
            }
        }

        stage('Build Project') {
            steps {
                dir(WORK_DIR) {
                    sh 'yarn build'
                }
            }
        }

        stage('Restart App with PM2') {
            steps {
                script {
                    def pm2Status = sh(script: "pm2 list | grep $PM2_NAME || true", returnStdout: true).trim()
                    if (pm2Status) {
                        sh "pm2 restart $PM2_NAME"
                    } else {
                        sh "pm2 start yarn --name $PM2_NAME -- start"
                    }
                }
                
            }
        }
    }

    post {
        always {
            script {
                def buildStatus = currentBuild.currentResult.toLowerCase()
                def buildEmoji = buildStatus == 'success' ? '✅' : '❌'
                def commitLink = "${env.GITHUB_REPO_URL}/commit/${env.GIT_COMMIT}"
                
                def discordDescription = """
                🚀 Jenkins Build Notification 🚀

                📦 Project Details:
                • Name: ${JOB_NAME}
                • Branch: ${BRANCH}

                🏗️ Build Information:
                • Status: ${currentBuild.currentResult} ${buildEmoji}
                • Build Number: #${BUILD_NUMBER}
                • Duration: ${currentBuild.duration / 1000} seconds
                
                📝 Commit Details:
                • Commit: ${env.GIT_COMMIT ?: 'N/A'}
                • Author: ${env.GIT_COMMIT_AUTHOR ?: 'Unknown'}
                • Message: ${env.GIT_COMMIT_MESSAGE ?: 'No commit message'}
                • Commit Link: ${commitLink}

                🔗 Build Links:
                • Jenkins Build: ${BUILD_URL}
                • Console Output: ${BUILD_URL}console
                """.trim()
                
                discordSend(
                    description: discordDescription,
                    link: env.BUILD_URL, 
                    result: currentBuild.currentResult, 
                    title: "Build Notification: ${JOB_NAME}",
                    webhookURL: "${DISCORD_WEBHOOK_URL}",
                )
            }
            
            // Clean up workspace
            cleanWs()
        }
        failure {
            echo "Build failed!"
        }
        success {
            echo "Deployment successful!"
        }
    }
}
