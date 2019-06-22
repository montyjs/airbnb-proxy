require('dotenv').config();
require('newrelic');
const express = require('express');
const path = require('path');
const redis = require('redis');
const fetch = require('node-fetch');
const template = require('./template.js');

const app = express();
const client = redis.createClient();
client.auth(process.env.REDIS_CRED);

const reviews = 'http://ec2-54-202-47-91.us-west-2.compute.amazonaws.com';
const host = 'http://ec2-54-189-186-19.us-west-2.compute.amazonaws.com';
const tour = 'http://ec2-54-188-57-59.us-west-2.compute.amazonaws.com';
const amenities = 'http://ec2-18-236-159-152.us-west-2.compute.amazonaws.com';


const generateRandomId = () => {
  const cached = 10000000 - Math.floor(Math.random() * 20000);
  const probablyNotCached = Math.floor(Math.random() * 10000000);
  const randoms = [cached, cached, probablyNotCached];
  return randoms[Math.floor(Math.random() * 3)].toString();
}

app.get('/:id?', (req, res) => {
  const id = req.params.id === undefined 
    ? generateRandomId() 
    : req.params.id.match(/^\d+$/) 
      ? req.params.id 
      : generateRandomId();
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
      const services = [fetchHTMLString(tour), fetchHTMLString(amenities), fetchHTMLString(reviews), fetchHTMLString(host)];

      Promise.all(services)
        .then(data => template(...data))
        .then(html => {
          client.set(id, html);
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

