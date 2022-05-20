const express = require('express');
const path = require('path');
const ctrl = require('./controllers');
const { API_KEY } = require('../config');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());

app.use((req, res, next) => {
  req.headers.auth = API_KEY;
  next();
});

app.get('/reviews', ctrl.reviews.getAll);
app.get('/reviews/averageRating/:id', ctrl.reviews.getAverageRating);

// app.get('/products/', ctrl.products);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
