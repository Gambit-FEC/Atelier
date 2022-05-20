const axios = require('axios');
const { API_KEY, API_URL } = require('../../config');

exports.getAllRelated = (req, res) => {
  console.log('inside server controller', req.query);
  axios.get(`${API_URL}products/`)
  res.status(200);
  res.send('Success');
};
