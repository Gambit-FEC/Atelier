const axios = require('axios');
const { API_KEY, API_URL } = require('../../config');

exports.getAllRelated = (req, res) => {
  // console.log('inside server controller', req.query);
  // console.log(req.query.ID);
  axios.get(`${API_URL}products/${req.query.ID}/related`, { headers: { Authorization: API_KEY } })
    .then((result) => {
    // console.log(result.data);
      res.status(200);
      res.send(result.data);
    });
};

exports.getRelatedInfo = (req, res) => {
  axios.get(`${API_URL}products/${req.query.ID}`, { headers: { Authorization: API_KEY } })
    .then((result) => {
      console.log(result.data);
      res.status(200);
      res.send(result.data);
    });
};
