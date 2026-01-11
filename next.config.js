/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/portal',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
