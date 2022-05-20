const axios = require('axios');
const { API_URL } = require('../../config');

exports.getAll = (req, res) => {
  res.sendStatus(200);
  // axios.get('/api_url' );
};

exports.getAverageRating = (req, res) => {
  axios.get(`${API_URL}reviews/meta`, { params: { product_id: req.params.id }, headers: { Authorization: req.headers.auth } })
    .then(({ data }) => {
      res.status(200).send(averageRatings(data.ratings));
    });
};

function averageRatings(ratings) {
  const ratingNums = {
    1: parseInt(ratings[1], 10) || 0,
    2: parseInt(ratings[2], 10) || 0,
    3: parseInt(ratings[3], 10) || 0,
    4: parseInt(ratings[4], 10) || 0,
    5: parseInt(ratings[5], 10) || 0,
  };
  let sum = 0;
  let totalRatings = 0;
  for (let i = 1; i <= 5; i++) {
    totalRatings += ratingNums[i];
    sum += ratingNums[i] * i;
  }
  return JSON.stringify(Math.floor((sum / totalRatings) * 2) / 2);
}
