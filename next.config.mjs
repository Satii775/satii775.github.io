// next.config.mjs

const isGitHubPages = process.env.NODE_ENV === "production";

const assetPrefix = isGitHubPages ? "/satii775.github.io/" : "";
const basePath = isGitHubPages ? "/satii775.github.io" : "";

module.exports = {
  output: "export",
  assetPrefix,
  basePath,
  images: {
    unoptimized: true,
  },
};