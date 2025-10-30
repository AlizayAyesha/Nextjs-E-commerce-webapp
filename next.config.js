const nextConfig = {
  images: {
    domains: ['v1.pinimg.com', 'cdn.sanity.io', 'i.pinimg.com', 'comfrt.com', 'www.warasibe.com', 'mlk5mpojvb9n.i.optimole.com', 'cdn-icons-png.flaticon.com'],
  },
  async rewrites() {
    return [
      {
        source: '/videos/:path*',
        destination: '/app/components/videos/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
