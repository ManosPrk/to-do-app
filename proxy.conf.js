require('dotenv').config();

const PROXY_CONFIG = [
    {
        context: [
            '/api'
        ],
        target: process.env.SERVER_URL,
        secure: false,
        bypass: (req) => {
            req.headers['x-forwarded-proto'] = 'https';
        }
    }
]

module.exports = PROXY_CONFIG;