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
  const keys = Object.keys(ratings);
  for (let i = 0; i < keys.length; i++) {
    total += parseInt(ratings[i], 10) || 0;
  }
  return total;
}

exports.getById = (req, res) => {
  axios.get(`${API_URL}reviews`, { params: Object.assign(req.params), headers: { Authorization: req.headers.Authorization } })
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
};

exports.getMeta = (req, res) => {
  axios.get(`${API_URL}reviews/meta`, { params: req.params, headers: { Authorization: req.headers.Authorization } })
    .then(({ data }) => res.status(200).send({
      ...data,
      averageRating: averageRatings(data.ratings),
      totalRatings: totalRatings(data.ratings),
    }))
    .catch((err) => res.status(400).send(err));
};

exports.addReview = (req, res) => {
  axios.post(`${API_URL}reviews`, req.body, { headers: { Authorization: req.headers.Authorization } })
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(401).send(err));
};

exports.updateHelpful = (req, res) => {
  axios.put(`${API_URL}reviews/${req.params.review_id}/helpful`, undefined, { headers: { Authorization: req.headers.Authorization } })
    .then(() => res.sendStatus(203))
    .catch((err) => res.status(403).send(err));
};

exports.report = (req, res) => {
  axios.put(`${API_URL}reviews/${req.params.review_id}/report`, undefined, { headers: { Authorization: req.headers.Authorization } })
    .then(() => res.sendStatus(205))
    .catch((err) => res.status(405).send(err));
};
