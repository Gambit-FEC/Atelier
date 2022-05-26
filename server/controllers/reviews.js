const axios = require('axios');
const { API_URL } = require('../../config');

function averageRatings(ratings) {
  const ratingNums = {};
  for (let i = 1; i <= 5; i++) {
    ratingNums[i] = parseInt(ratings[i - 1], 10) || 0;
  }
  let sum = 0;
  let total = 0;
  for (let i = 1; i <= 5; i++) {
    total += ratingNums[i];
    sum += ratingNums[i] * i;
  }
  return Math.floor((sum / total) * 4) / 4;
}

function totalRatings(ratings) {
  let total = 0;
  for (let key in ratings) {
    total += parseInt(ratings[key]) || 0;
  }
  return total;
}

exports.getById = (req, res) => {
  axios.get(`${API_URL}reviews`, { params: Object.assign(req.params, { count: 2 }), headers: { Authorization: req.headers.Authorization } })
    .then(({ data }) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('Error fetching from reviews API:', err);
      res.sendStatus(400);
    });
};

exports.getMeta = (req, res) => {
  axios.get(`${API_URL}reviews/meta`, { params: req.params, headers: { Authorization: req.headers.Authorization } })
    .then(({ data }) => {
      res.status(200).send(
        Object.assign(data, {
          averageRating: averageRatings(data.ratings),
          totalRatings: totalRatings(data.ratings),
        }),
      );
    })
    .catch((err) => {
      console.log('Error fetching average ratings from reviews API:', err);
      res.sendStatus(400);
    });
};

exports.addReview = (req, res) => {
  console.log(typeof req.body);
  axios.post(`${API_URL}reviews`, req.body, { headers: { Authorization: req.headers.Authorization } })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error posting to reviews API:', err);
      res.sendStatus(401);
    });
};
