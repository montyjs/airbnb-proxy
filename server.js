const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();
const redis = require('redis');
const fetch = require('node-fetch');
const client = redis.createClient();
const template = require('./template.js');

// app.get('/', function(req, res) {
//   res.redirect('/listings/1');
// });
const reviews = 'http://ec2-54-202-47-91.us-west-2.compute.amazonaws.com'
const host = 'http://ec2-54-189-186-19.us-west-2.compute.amazonaws.com'

// app.use(express.static('public'));

app.get('/listings/:id', function(req, res) {
  const reactPath = path.join(__dirname, '/public/index.html');
  res.sendFile(reactPath);
});

const generateRandomId = () => {
  return '5';
}

app.get('/:id', (req, res) => {
  const id = req.params.id === 'randy' ? generateRandomId() : req.params.id;
  console.log('before redis')
  // Redis check for id in cache
  client.get(id, (err, html) => {
    if (err) {
      console.log(err);
    }
    if (html) {
      console.log('got html');
      res.send(html);
    } else { // No cache, so fetch HTML
      console.log('else block')
      const str1 = fetch(`${reviews}/proxy/${id}`)
        .then(res => res.text())
        .then(data => data);
      const str2 = fetch(`${host}/proxy/${id}`)
        .then(res => res.text())
        .then(data => data);

      const str3 = '<h1 style="color: chocolate">I liek turtlez</h1>';// fetch(``)
        // .then(res => res.text())
        // .then(data => data);

      const str4 = '<h1 style="color: chocolate">So... i herd you liek mudkipz</h1>'; // fetch(`http://ec2-54-202-47-91.us-west-2.compute.amazonaws.com/proxy/${id}`)
        // .then(res => res.text())
        // .then(data => data);

      Promise.all([str1, str2, str3, str4])
      .then(data => template(...data))
      .then(html => {
        console.log('about to send html')
        // client.set(id, html)
        res.send(html);
      })
      .catch(err => res.status(400).send(err));
    }
  });
});


app.listen(3000, err => {  
  if (err) {
    return console.log(err)
  }
  console.log('Listening on port 3000!')  
});