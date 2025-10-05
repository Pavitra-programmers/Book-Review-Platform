const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Only use proxy in development mode
  if (process.env.NODE_ENV === 'development') {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'https://book-review-platform-behq.onrender.com',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        onError: function (err, req, res) {
          console.log('Proxy error:', err);
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Unable to reach the deployed backend. Please verify it is up.');
        }
      })
    );
  }
};