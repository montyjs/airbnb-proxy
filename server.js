const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();

app.get('/', function(req, res) {
  res.redirect('/listings/1');
});

app.use(express.static('public'));

app.get('/listings/:id', function(req, res) {
  const reactPath = path.join(__dirname, '/public/index.html');
  res.sendFile(reactPath);
});

app.use(
  '/api/listings/:id/header',
  proxy({
    target: 'http://127.0.0.1:3001'
  })
);

app.use(
  '/api/listings/:id/tour',
  proxy({
    target: 'http://127.0.0.1:3002'
  })
);

app.use(
  '/api/listings/:id/amenities',
  proxy({
    target: 'http://127.0.0.1:3003'
  })
);

app.use(
  '/api/listings/:id/reviews',
  proxy({
    target: 'http://127.0.0.1:3004'
  })
);

// app.use(
  // '/api/listings/:id/host',
  // proxy({
    // target: 'http://127.0.0.1:3004'
  // })
// );

app.listen(3000, () => console.log('Listening on port 3000!'));

// var express = require('express')
// var proxy = require('http-proxy-middleware')
 
// // proxy middleware options
// var options = {
//   target: 'http://www.example.org', // target host
//   changeOrigin: true, // needed for virtual hosted sites
//   ws: true, // proxy websockets
//   pathRewrite: {
//     '^/api/old-path': '/api/new-path', // rewrite path
//     '^/api/remove/path': '/path' // remove base path
//   },
//   router: {
//     // when request.headers.host == 'dev.localhost:3000',
//     // override target 'http://www.example.org' to 'http://localhost:8000'
//     'dev.localhost:3000': 'http://localhost:8000'
//   }
// }
 
// // create the proxy (without context)
// var exampleProxy = proxy(options)
 
// // mount `exampleProxy` in web server
// var app = express()
// app.use('/api', exampleProxy)
// app.listen(3000)