/** @type {import('next').NextConfig} */
export const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: { esmExternals: true },
	images: {
		domains: ['raw.githubusercontent.com'],
	}
};

export default nextConfig;