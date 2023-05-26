const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        ["/sitefinity", "*.axd", "/adminapp", "/sf/system", "/api/default", "/ws", "/restapi", "/contextual-help", "/res"],
        createProxyMiddleware({
            secure: false,
            target: '',
            changeOrigin: true,
            onProxyReq: (proxyReq, req, res) => {
                proxyReq.setHeader('X-ORIGINAL-HOST', 'localhost:3000');
            },
            onProxyRes: (proxyRes) => {
            },
            onError: (err, req, res) => {
            }
        })
    );
};