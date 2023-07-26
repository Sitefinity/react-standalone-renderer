const next = require('next')

// note the "https" not "http" required module. You will get an error if trying to connect with https
const https = require('https')
const fs = require("fs");

const hostname = 'localhost'
const port = 6001;

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev, hostname, port });

const sslOptions = {
    key: fs.readFileSync("./cert/cert.key"),
    cert: fs.readFileSync("./cert/cert.crt")
}

const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = https.createServer(sslOptions, (req, res) => {
        // Handle Next.js routes
        return handle(req, res);
    })
    server.listen(port, (err) => {
        if (err) throw err
        console.log('> Ready on https://localhost:' + port);
    })
})
