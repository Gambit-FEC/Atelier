const axios = require('axios');
const { API_KEY, API_URL } = require('../../config');

exports.getAllRelated = (req, res) => {
  console.log('inside server controller', req.query);
  // axios.get()
  res.status(200);
  res.send('Success');
};
