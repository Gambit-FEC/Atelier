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
  for (const key in ratings) {
    total += parseInt(ratings[key], 10) || 0;
  }
  return total;
}

exports.getById = (req, res) => {
  axios.get(`${API_URL}reviews`, { params: Object.assign(req.params), headers: { Authorization: req.headers.Authorization } })
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
      res.status(200).send({
        ...data,
        averageRating: averageRatings(data.ratings),
        totalRatings: totalRatings(data.ratings),
      });
    })
    .catch((err) => {
      console.log('Error fetching average ratings from reviews API:', err);
      res.sendStatus(400);
    });
};

exports.addReview = (req, res) => {
  axios.post(`${API_URL}reviews`, req.body, { headers: { Authorization: req.headers.Authorization } })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error posting to reviews API:', err);
      res.sendStatus(401);
    });
};

exports.updateHelpful = (req, res) => {
  axios.put(`${API_URL}reviews/${req.params.review_id}/helpful`, undefined, { headers: { Authorization: req.headers.Authorization } })
    .then(() => {
      res.sendStatus(203);
    })
    .catch((err) => {
      console.log('Error updating helpful status:', err);
      res.sendStatus(403);
    });
};

exports.report = (req, res) => {
  axios.put(`${API_URL}reviews/${req.params.review_id}/report`, undefined, { headers: { Authorization: req.headers.Authorization } })
    .then(() => {
      res.sendStatus(205);
    })
    .catch((err) => {
      console.log('Error reporting review:', err);
      res.sendStatus(405);
    });
};
