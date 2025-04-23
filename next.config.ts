import type { NextConfig } from 'next';

interface WebpackConfig {
  resolve: {
    fallback: Record<string, boolean>;
  };
  module: {
    rules: any[];
  };
}

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack(config: WebpackConfig, { isServer }) {
    if (!isServer) {
      // Excluir módulos nativos de Node del bundle cliente
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        path: false,
      };
      // Ignorar imports de .html en node_modules
      config.module.rules.push({
        test: /\.html$/,
        use: 'ignore-loader',
      });
    }
    return config;
  },
};

export default nextConfig;