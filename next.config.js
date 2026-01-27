/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Removido para suportar API routes (NextAuth)
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
