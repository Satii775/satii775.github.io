/** @type {import('next').NextConfig} */
const nextConfig = {};

const isGitHubPages = process.env.NODE_ENV === "production";

const assetPrefix = isGitHubPages ? "/satii775.github.io/" : "";
const basePath = isGitHubPages ? "/satii775.github.io" : "";

export default {
    nextConfig, 
    output: "export",
    assetPrefix,
    basePath,
};