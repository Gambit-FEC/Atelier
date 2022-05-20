const router = require('express').Router();
const ctrl = require('./controllers');
const { API_KEY, API_URL } = require('../config');

router.use((req, res, next) => {
  req.headers.Authorization = API_KEY;
  next();
});

router.get(`${API_URL}reviews/`, ctrl.reviews.get);
