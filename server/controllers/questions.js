const axios = require('axios');
const { API_KEY, API_URL } = require('../../src/components/questions-answers/config');

exports.getAllQuestions = (req, res) => {
  console.log('getAllQuestions here');

  axios.get(`${API_URL}/qa/questions`, { params: { product_id: req.params.productId }, headers: { Authorization: API_KEY } })
    .then((result) => {
      console.log(result, 'result of get request');
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
};
