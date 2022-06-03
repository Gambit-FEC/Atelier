const axios = require('axios');
const { API_KEY, API_URL } = require('../../config');

exports.getAllRelated = (req, res) => {
  // console.log(req.params);
  // console.log(req.params.product_id);
  axios.get(`${API_URL}products/${req.params.product_id}/related`, { headers: { Authorization: API_KEY } })
    .then((result) => {
      // console.log(result.data);
      res.status(200);
      res.send(result.data);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
};

exports.getRelatedInfo = (req, res) => {
  // console.log(req.params);
  axios.get(`${API_URL}products/${req.params.product_id}`, { headers: { Authorization: API_KEY } })
    .then((result) => {
      const data = {
        id: result.data.id,
        name: result.data.name,
        category: result.data.category,
      };
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
};

exports.getRelatedStyle = (req, res) => {
  axios.get(`${API_URL}products/${req.params.product_id}/styles`, { headers: { Authorization: API_KEY } })
    .then((result) => {
      res.status(200);
      const styleData = {
        photo: result.data.results[0].photos[0],
        price: result.data.results[0].original_price,
        sale: result.data.results[0].sale_price,
      };
      res.send(styleData);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
};
