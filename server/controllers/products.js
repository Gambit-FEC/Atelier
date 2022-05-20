const axios = require('axios');

exports.getProductInfo = (req, res) => {
  // eslint-disable-next-line no-console
  console.log('do i work?');
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.productId}`, { headers: { Authorization: req.headers.Authorization } })
    .then((data) => { res.status(200).send(data.data); })
    .catch((err) => { console.log('err', err); res.status(500).send(err); });
  // res.sendStatus(200);
  // axios.get('/api_url' );
};
