/** @type {import('next').NextConfig} */
const nextConfig = {
  // The site is hand-authored static markup; keep plain <img> tags so the
  // layout renders pixel-identical to the original HTML (no next/image resizing).
  eslint: {
    // <img> usage is intentional here — don't fail the build on the warning.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
