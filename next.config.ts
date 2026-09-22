import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // next/image fetches remote URLs server-side, so only permit X's image CDN.
    remotePatterns: [{ protocol: 'https', hostname: 'pbs.twimg.com', pathname: '/**' }],
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'Content-Security-Policy', value: "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' https://pbs.twimg.com data: blob:; connect-src 'self' https://vitals.vercel-insights.com https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; upgrade-insecure-requests" },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      ],
    }];
  },
};

export default nextConfig;
