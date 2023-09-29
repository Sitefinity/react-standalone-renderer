const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        [/\/sitefinity(?!\/template)/i, "*.axd", "/adminapp", "/sf/system", "/api/default", "/ws", "/restapi", "/contextual-help", "/res", "/admin-bridge", "/sfres", "/images", "/documents", "/videos"],
        createProxyMiddleware({
            secure: false,
            target: process.env.PROXY_URL,
            changeOrigin: true,
            selfHandleResponse: true,
            onProxyReq: (proxyReq, req, res) => {
                if (process.env.SF_CLOUD_KEY) {
                    proxyReq.setHeader('X-SF-BYPASS-HOST', `localhost:${process.env.PORT}`);
                    proxyReq.setHeader('X-SF-BYPASS-HOST-VALIDATION-KEY', process.env.SF_CLOUD_KEY);
                } else {
                    proxyReq.setHeader('X-ORIGINAL-HOST', `${process.env.PROXY_ORIGINAL_HOST}:${process.env.PORT}`);
                }
            },
            onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
                if ((req.url.indexOf("pages/Default.GetPageTemplates") !== -1 || req.url.indexOf("templates/Default.GetPageTemplates") !== -1) && proxyRes.statusCode === 200) {
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
                            ThumbnailUrl: "/assets/thumbnail-default.png",
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
