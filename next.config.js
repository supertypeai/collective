/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'supertype.ai',
      'avatars.githubusercontent.com',
      // linkedin
      'media-exp1.licdn.com',
      'media.licdn.com'
    ],
  }
}

module.exports = nextConfig
