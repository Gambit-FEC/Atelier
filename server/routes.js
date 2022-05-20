const express = require('express');
const path = require('path');
const ctrl = require('./controllers');
const { API_KEY } = require('../config');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());

app.get('/reviews/averageRating', ctrl.reviews.getAll);

// app.get('/products/', ctrl.products);

app.get('/products/related', ctrl.related.getAllRelated);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
