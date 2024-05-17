/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "image.api.playstation.com",
            "localhost",
            "cdn.akamai.steamstatic.com",
            "cdn.cloudflare.steamstatic.com",
            "cdn1.epicgames.com",
        ],
    },
};

export default nextConfig;
