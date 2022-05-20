const express = require('express');
const path = require('path');
const ctrl = require('./controllers');
const { API_KEY } = require('../config');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());

app.use((req, res, next) => {
  req.headers.Authorization = API_KEY;
  next();
});

app.get('/reviews/:product_id', ctrl.reviews.getById);
app.get('/reviews/averageRating/:product_id', ctrl.reviews.getAverageRating);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
