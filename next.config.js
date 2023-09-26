/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'CMS URL' + 'api/:path*',
            },
        ];
    },
};

module.exports = nextConfig;
