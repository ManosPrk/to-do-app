const PROXY_CONFIG = [
    {
        context: [
            '/api'
        ],
        target: "http://127.0.0.1:3000",
        secure: false,
    }
]

module.exports = PROXY_CONFIG;