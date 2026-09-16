/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site is prerendered to /out, which is what
  // Netlify publishes. No server runtime, no Next plugin needed.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
