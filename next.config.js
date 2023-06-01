/** @type {import('next').NextConfig} */
const nextConfig = 
{
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
        port: '',
        pathname: '/apod/image/**'
      },
      {
        protocol: 'http',
        hostname: 'mars.jpl.nasa.gov',
        port: '',
        pathname: '/msl-raw-images/**'
      },
      {
        protocol: 'https',
        hostname: 'mars.nasa.gov',
        port: '',
        pathname: '/msl-raw-images/**'
      },
      {
        protocol: 'http',
        hostname: 'mars.nasa.gov',
        port: '',
        pathname: '/mer/**'
      },
      {
        protocol: 'https',
        hostname: 'images-assets.nasa.gov',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'technology.nasa.gov',
        port: '',
        pathname: '/**'
      },
    ],
  },
  
}

module.exports = nextConfig

