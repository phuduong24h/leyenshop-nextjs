const withNextIntl = require('next-intl/plugin')('./src/i18n.js');

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  sassOptions: {
    additionalData: `
            @import "src/styles/sass/_variables.scss";
            @import "src/styles/sass/_mixins.scss";
        `
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'salt.tikicdn.com' },
      { protocol: 'https', hostname: 'tsgcoop.com' },
      { protocol: 'https', hostname: 'minio.windduong.com' },
      { protocol: 'https', hostname: 'www.btaskee.com' }
    ]
  }
};

module.exports = withNextIntl(nextConfig);
