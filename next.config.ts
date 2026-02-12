/** @type {import('next').NextConfig} */

// En producción (GitHub Pages) la app está en /valentines-gift. En desarrollo, en la raíz.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/valentines-gift" : "";
const assetPrefix = isProd ? "/valentines-gift/" : "";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix,
};

module.exports = nextConfig;