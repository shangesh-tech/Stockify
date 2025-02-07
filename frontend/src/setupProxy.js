import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    'scanner',
    createProxyMiddleware({
      target: 'https://scanner.tradingview.com',
      changeOrigin: true,
      pathRewrite: {
        '^/scanner': '/india/scan', // Rewriting the path to target the correct endpoint
      },
    })
  );
}
