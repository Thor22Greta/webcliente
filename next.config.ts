import type { NextConfig } from 'next';

interface WebpackConfig {
  resolve: {
    fallback: {
      fs: boolean;
    };
  };
}

interface CompilerConfig {
  reactRemoveProperties: boolean;
  styledComponents: boolean;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config: WebpackConfig, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
  compiler: {
    reactRemoveProperties: true, // Elimina propiedades problemáticas
    styledComponents: true, // Si usas styled-components
  } as CompilerConfig,
};

module.exports = nextConfig;