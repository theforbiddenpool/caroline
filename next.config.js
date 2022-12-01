/** @type {import('next').NextConfig} */
const nextI18NextConfig = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
  },
  i18n: nextI18NextConfig.i18n,
};
