import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
//   // Enable experimental features
//   experimental: {
//     // Enable React 19 features
//     reactCompiler: true,
//     // Optimize bundle for performance
//     optimizePackageImports: ['lucide-react', '@stackframe/stack'],
//   },

  // Turbopack configuration for development
  turbopack: {
    rules: {
      // Handle audio files for sound effects
      '*.mp3': {
        loaders: ['file-loader'],
        as: '*.mp3',
      },
      // Optimize SVG handling
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;