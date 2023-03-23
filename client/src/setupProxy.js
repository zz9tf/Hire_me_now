const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: process.env.REACT_APP_BECKEND_HOST,
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(proxy)
  );
};