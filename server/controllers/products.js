const axios = require('axios');
const { API_URL } = require('../../config');

exports.getOneProduct = async (req, res) => {
  axios.get(`${API_URL}products/${req.params.productId}`, { headers: { Authorization: req.headers.Authorization } })
    .then((products) => {
      axios.get(`${API_URL}products/${req.params.productId}/styles`, { headers: { Authorization: req.headers.Authorization } })
        .then((styles) => {
          const combined = [];
          combined.push(products.data, styles.data);
          res.status(200).send(combined);
        })
        .catch((err) => { res.status(404).send(err); });
    })
    .catch((err) => { res.status(404).send(err); });
};
