const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Only use proxy in development mode
  if (process.env.NODE_ENV === 'development') {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        onError: function (err, req, res) {
          console.log('Proxy error:', err);
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Backend server is not running. Please start the backend server first.');
        }
      })
    );
  }
};