const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    // Include the main styles directory (adjusted to src/styles for this project)
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  webpack: (config) => {
    // Ensure older packages that import "react/jsx-runtime" without an extension
    // resolve correctly under newer Node/ESM behavior.
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Fix ESM import resolution for some packages (e.g. react-confetti)
      'react/jsx-runtime': require.resolve('react/jsx-runtime.js'),
      // Moralis optional connectors – we don't use Magic or Web3Auth directly,
      // so alias them to "false" to silence missing-module errors in builds
      // (both locally and on Vercel).
      'magic-sdk': false,
      '@web3auth/web3auth': false,
    }

    return config
  },
}

module.exports = nextConfig