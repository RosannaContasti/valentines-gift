/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

console.log('isProd', isProd);

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath: '/valentines-gift',
 // basePath: process.env.NODE_ENV === 'production' ? '/valentines-gift' : '',
 //basePath: isProd ? '/valentines-gift' : '',
// assetPrefix: isProd ? '/valentines-gift/' : '',
basePath: "/valentines-gift",
assetPrefix: "/valentines-gift/",
}

module.exports = nextConfig