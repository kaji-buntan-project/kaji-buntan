/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  webpack: (config, { isServer }) => {
    config.experiments = {
       asyncWebAssembly: true,
      layers: true,
    };
    config.output.webassemblyModuleFilename = (isServer ? "../" : "") + "static/wasm/[modulehash].wasm";
    return config;
  }
}