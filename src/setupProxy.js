const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        ["/sitefinity", "*.axd", "/adminapp", "/sf/system", "/api/default", "/ws", "/restapi", "/contextual-help", "/res", "/admin-bridge"],
        createProxyMiddleware({
            secure: false,
            target: 'https://localhost',
            changeOrigin: true,
            selfHandleResponse: true,
            onProxyReq: (proxyReq, req, res) => {
                if (process.env.PORT !== 80 && process.env.PORT !== 443) {
                    proxyReq.setHeader('X-ORIGINAL-HOST', `localhost:${process.env.PORT}`);
                } else {
                    proxyReq.setHeader('X-ORIGINAL-HOST', `localhost`);
                }
            },
            onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
                // req.url.indexOf("templates/Default.GetPageTemplates") != -1) { // this should be the real live scenario
                if (req.url.indexOf("pages/Default.GetPageTemplates") != -1 || req.url.indexOf("templates/Default.GetPageTemplates") != -1) {
                    const response = responseBuffer.toString('utf8');
                    let responseAsJson = JSON.parse(response);
                    responseAsJson.value.splice(0, 0, {
                        Subtitle: "New editor",
                        Title: "Local React Templates",
                        Type: 0,
                        Visible: true,
                        Templates: [{
                            Framework: 1,
                            Id: "00000000-0000-0000-0000-000000000000",
                            Name: "React.Default",
                            ThumbnailUrl : "/assets/thumbnail-default.png",
                            Title: "Default",
                            UsedByNumberOfPages: 0
                        }]
                    });

                    return JSON.stringify(responseAsJson);
                }

                return responseBuffer;
            }),
            onError: (err, req, res) => {
            }
        })
    );
};