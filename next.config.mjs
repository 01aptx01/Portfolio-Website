/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: isGithubActions ? "/Portfolio-Website" : "",
  assetPrefix: isGithubActions ? "/Portfolio-Website/" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
