/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains:[
      'ipfs.infura.io',
      'statics-polygon-lens-staging.s3.eu-west-1.amazonaws.com',
      'statics-polygon-lens.s3.eu-west-1.amazonaws.com',
      'cf-ipfs.com',
      'lens.infura-ipfs.io',
      ''
    ]
  }
}

module.exports = nextConfig
