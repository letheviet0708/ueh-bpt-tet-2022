module.exports = {
  reactStrictMode: true,
  env: {
    GDPR: 2,
  },
  images: {
    domains: ['i.imgur.com'],
  },
  crossOrigin: 'anonymous',
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
}