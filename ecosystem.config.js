module.exports = {
  apps: [
    {
      name: 'leyenshop-nextjs',
      script: 'dist/index.js',
      // watch: true,
      // autorestart: true,
      out_file: './logs/output.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      combine_logs: true,
      cron_restart: '0 0 * * *',
      interpreter: 'node',
      env: {
        PORT: 3101
      },
      env_development: {
        PORT: 3101
      },
      env_production: {
        PORT: 4101,
        NODE_ENV: 'production',
        COMMON_VARIABLE: true
      }
    }
  ],
  deploy: {
    dev: {
      user: 'root',
      host: '103.143.208.109',
      ref: 'origin/master',
      repo: 'git@github.com:windduongcorp/leyenshop-nextjs.git',
      path: '/root/leyenshop-nextjs',
      'pre-deploy-local': '',
      'post-deploy': 'yarn && yarn build && pm2 restart ecosystem.config.js --env development',
      'pre-setup': ''
    },
    prod: {
      user: 'root',
      host: '103.143.208.109',
      ref: 'origin/production',
      repo: 'git@github.com:windduongcorp/leyenshop-nextjs.git',
      path: '/root/leyenshop-nextjs',
      'pre-deploy-local': '',
      'post-deploy': 'yarn && yarn build && pm2 restart ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
