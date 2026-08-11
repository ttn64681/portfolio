import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // runner image only copies traced runtime files
  output: 'standalone',
  // standalone tracing doesn't follow fs.readFile(file) paths to trace (file);
  // (just in case)
  outputFileTracingIncludes: {
    '/api/resume': ['./src/data/Thai_Nguyen_Resume_2026.pdf'],
  },

  // Route aliases for old/bookmarked URLs after nav renames (just in case)
  async redirects() {
    return [
      { source: '/extras', destination: '/explore', permanent: false },
      { source: '/explore/projects', destination: '/explore?focus=projects', permanent: false },
      {
        source: '/explore/experiences',
        destination: '/explore?focus=experiences',
        permanent: false,
      },
      { source: '/extras/games', destination: '/explore?focus=games', permanent: false },
    ];
  },
};

export default nextConfig;
