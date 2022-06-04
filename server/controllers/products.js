const axios = require('axios');
const { API_URL } = require('../../config');

exports.getOneProduct = async (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.productId}`, { headers: { Authorization: req.headers.Authorization } });
  try {
    const overview = await axios.get(`${API_URL}products/${req.params.productId}`, { headers: { Authorization: req.headers.Authorization } });
    const styles = await axios.get(`${API_URL}products/${req.params.productId}/styles`, { headers: { Authorization: req.headers.Authorization } });
    const combined = [];
    await combined.push(overview.data, styles.data);
    res.status(200).send(combined);
  } catch (err) {
    res.status(400).send(err);
  }
};
