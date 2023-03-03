/** @type {import('next').NextConfig} */
export const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: { esmExternals: true }
};

export default nextConfig;