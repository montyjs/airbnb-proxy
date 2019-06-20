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
const reviews = 'http://ec2-54-202-47-91.us-west-2.compute.amazonaws.com';
const host = 'http://ec2-54-189-186-19.us-west-2.compute.amazonaws.com';
const tour = 'http://ec2-54-189-186-19.us-west-2.compute.amazonaws.com';
const amenities = 'http://ec2-54-189-186-19.us-west-2.compute.amazonaws.com';

// app.use(express.static('public'));

app.get('/listings/:id', function(req, res) {
  const reactPath = path.join(__dirname, '/public/index.html');
  res.sendFile(reactPath);
});

const generateRandomId = () => {
  const cached = 10000000 - Math.floor(Math.random() * 20000);
  const probablyNotCached = Math.floor(Math.random() * 10000000);
  const randoms = [cached, cached, probablyNotCached];
  return randoms[Math.floor(Math.random() * 3)];
}

app.get('/:id', (req, res) => {
  const id = !req.params.id.match(/^\d+$/) ? generateRandomId() : req.params.id;
  console.log('before redis')
  // Redis check for id in cache
  client.get(id, (err, html) => {
    if (err) {
      console.log(err);
    }
    if (html) {
      console.log('got html');
      res.send(html);

    } else { /* if no cache, fetch HTML from services */

      const fetchHTMLString = (url => {
        return fetch(`${url}/proxy/${id}`)
          .then(res => res.text())
          .then(data => data);
      });
      
      const tourFetch = fetchHTMLString(tour);
      const amenitiesFetch = fetchHTMLString(amenities);
      const reviewsFetch = fetchHTMLString(reviews);
      const hostFetch = fetchHTMLString(host);

      Promise.all([ tourFetch, amenitiesFetch, reviewsFetch, hostFetch ])
      .then(data => template(...data))
      .then(html => {
        console.log('about to send html')
        client.set(id, html)
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