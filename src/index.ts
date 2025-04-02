import express, { Request, Response } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

const app = express();

const proxyOptions: Options<Request, Response> = {
  target: 'http://127.0.0.1:3001/',
  changeOrigin: true,
  proxyTimeout: 10000,
};

app.use(express.json());

app.use(
  '/',
  createProxyMiddleware({
    ...proxyOptions,
    on: {
      proxyReq: (proxyReq, req) => {
        // fixRequestBody(proxyReq, req);
        console.log(
          `[${new Date().toISOString()}] Proxy request: ${req.method} ${req.path}`,
        );
      },
      proxyRes: (proxyRes, req) => {
        console.log(
          `[${new Date().toISOString()}] Proxy response: ${req.method} ${req.path}`,
        );
      },
    },
  }),
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening at http://127.0.0.1:${PORT}`);
});
