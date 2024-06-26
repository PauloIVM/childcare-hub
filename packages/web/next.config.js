/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.melhorplano.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
