const axios = require('axios');
const { API_URL } = require('../../config');

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
  for (let i = 1; i <= 5; i += 1) {
    totalRatings += ratingNums[i];
    sum += ratingNums[i] * i;
  }
  return JSON.stringify(Math.floor((sum / totalRatings) * 2) / 2);
}

exports.getById = (req, res) => {
  axios.get(`${API_URL}reviews`, { params: req.params, headers: { Authorization: req.headers.Authorization } });
  res.sendStatus(200);
  // axios.get('/api_url' );
};

exports.getAverageRating = (req, res) => {
  axios.get(`${API_URL}reviews/meta`, { params: req.params, headers: { Authorization: req.headers.Authorization } })
    .then(({ data }) => {
      res.status(200).send(averageRatings(data.ratings));
    })
    .catch((err) => {
      res.sendStatus(400);
    });
};
