/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'supertype.ai',
      'raw.githubusercontent.com',
      'avatars.githubusercontent.com',
      'user-images.githubusercontent.com',
      'osfehplavmahboowlueu.supabase.co',
      // linkedin
      'media-exp1.licdn.com',
      'media.licdn.com',
    ],
  }
}

module.exports = nextConfig
