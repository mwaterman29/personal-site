/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.imgur.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'i.gyazo.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'play-lh.googleusercontent.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.discordapp.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'i.scdn.co',
            port: '',
            pathname: '/**',
          }
        ],
      },

}

module.exports = nextConfig
