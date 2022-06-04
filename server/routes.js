const express = require('express');
const compress = require('compression');
const path = require('path');
const ctrl = require('./controllers');
const { API_KEY } = require('../config');

const app = express();

app.use(compress(), express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());

app.use((req, res, next) => {
  req.headers.Authorization = API_KEY;
  next();
});

// Reviews Routes
app.get('/reviews/:product_id/:page/:count/:sort', ctrl.reviews.getById);
app.get('/reviews/meta/:product_id', ctrl.reviews.getMeta);
app.post('/reviews', ctrl.reviews.addReview);
app.put('/reviews/:review_id/helpful', ctrl.reviews.updateHelpful);
app.put('/reviews/:review_id/report', ctrl.reviews.report);

// Related Items Routes
app.get('/related/productList/:product_id', ctrl.related.getAllRelated);
app.get('/related/productInfo/:product_id', ctrl.related.getRelatedInfo);
app.get('/related/productStyle/:product_id', ctrl.related.getRelatedStyle);

// Product Info Routes
app.get('/products/:productId', ctrl.products.getOneProduct);
app.get('/cart', ctrl.products.addToCart);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
