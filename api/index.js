const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({ target: 'https://api.okzy.tv/api.php/provide/vod/at/json/', changeOrigin: true }));
app.listen(8081);