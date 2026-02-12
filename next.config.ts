/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath: '/valentines-gift',
  basePath: process.env.NODE_ENV === 'production' ? '/valentines-gift' : '',
}

module.exports = nextConfig