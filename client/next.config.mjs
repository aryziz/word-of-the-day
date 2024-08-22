const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/cats',
                destination: 'https://meowfacts.herokuapp.com',
            },
            {
                source: "/api/:path*",
                destination: "http://localhost:8080/api/:path*"
            }
        ];
    }
};

export default nextConfig;