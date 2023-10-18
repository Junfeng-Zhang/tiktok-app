/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // 添加一个规则来处理canvas.node二进制模块
        config.module.rules.push({ test: /\.node$/, use: 'raw-loader' });
    
        // 排除浏览器中的 Next.js 处理画布
        if (!isServer) config.externals.push('canvas');
        return config;
    },
}

module.exports = nextConfig
