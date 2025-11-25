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
      'react/jsx-runtime': require.resolve('react/jsx-runtime.js'),
    }

    return config
  },
}

module.exports = nextConfig