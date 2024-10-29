/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "via.placeholder.com" },
            { hostname: "images.pexels.com" },
        ],
    },
};

export default nextConfig;
