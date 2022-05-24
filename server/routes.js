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

// Reviews Routes
app.get('/reviews/:product_id/:page/:sort', ctrl.reviews.getById);
app.get('/reviews/meta/:product_id', ctrl.reviews.getMeta);

// Related Items Routes
app.get('/related/productList/:product_id', ctrl.related.getAllRelated);
app.get('/related/productInfo/:product_id', ctrl.related.getRelatedInfo);
app.get('/related/productStyle/:product_id', ctrl.related.getRelatedStyle);

// Product Info Routes
// app.get('/products/:productId', ctrl.products.getProductInfo);
app.get('/products/:productId', ctrl.products.getOneProduct);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
