const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

module.exports = function (app) {
    let host = "localhost";
    app.use(
        ["/sitefinity", "*.axd", "/adminapp", "/sf/system", "/api/default", "/ws", "/restapi", "/contextual-help", "/res"],
        createProxyMiddleware({
            secure: false,
            target: `https://${host}`,
            changeOrigin: true,
            selfHandleResponse: true,
            onProxyReq: (proxyReq, req, res) => {
                proxyReq.setHeader('X-ORIGINAL-HOST', host);
            },
            onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
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
                            ThumbnailUrl : "",
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