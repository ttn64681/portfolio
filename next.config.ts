import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/extras', destination: '/explore', permanent: false },
      { source: '/explore/projects', destination: '/explore?focus=projects', permanent: false },
      { source: '/explore/experiences', destination: '/explore?focus=experiences', permanent: false },
      { source: '/extras/games', destination: '/explore?focus=games', permanent: false },
    ];
  },
};

export default nextConfig;
