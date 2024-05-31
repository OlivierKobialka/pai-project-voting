/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "image.api.playstation.com",
            "localhost",
            "cdn.akamai.steamstatic.com",
            "cdn.cloudflare.steamstatic.com",
            "cdn1.epicgames.com",
            "upload.wikimedia.org",
            "static.wikia.nocookie.net",
            "media.steampowered.com",
        ],
    },
};

export default nextConfig;
