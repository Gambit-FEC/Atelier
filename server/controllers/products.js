const axios = require('axios');
const { API_URL } = require('../../config');

// get all products
// exports.getProductInfo = (req, res) => {
//   // eslint-disable-next-line no-console
//   console.log('do i work?');
//   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.productId}`, { headers: { Authorization: req.headers.Authorization } })
//     .then((data) => { res.status(200).send(data.data); })
//     // eslint-disable-next-line no-console
//     .catch((err) => { console.log('db getProductInfo error:', err); res.status(500).send(err); });
// };

// get one product
exports.getOneProduct = async (req, res) => {
  console.log('get1product server works??')
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.productId}`, { headers: { Authorization: req.headers.Authorization } })
  try {
    const overview = await axios.get(`${API_URL}products/${req.params.productId}`, { headers: { Authorization: req.headers.Authorization }});
    const styles = await axios.get(`${API_URL}products/${req.params.productId}/styles`, { headers: { Authorization: req.headers.Authorization }});
    const combined = [];
    await combined.push(overview.data, styles.data);
    res.status(200).send(combined);
  } catch (err) {
    res.status(400).send(err);
  }
};

// const related = await axios.get(`${API_URL}products/${req.params.productId}/related`, { headers: { Authorization: req.headers.Authorization }});
// const reviews = await axios.get(`${API_URL}reviews/?product_id=${req.params.productId}`, { headers: { Authorization: req.headers.Authorization }});