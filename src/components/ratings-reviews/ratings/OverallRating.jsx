import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalStore';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';

export default function OverallRating() {
  const { setReviewsMeta } = useContext(RatingsAndReviewsContext);
  const { productId, setAvgRating, avgRating } = useGlobalContext();
  useEffect(() => {
    axios.get(`/reviews/meta/${productId}`)
      .then(({ data }) => {
        console.log('fetched average', data);
        setReviewsMeta(data);
        setAvgRating(data.averageRating);
      })
      .catch((err) => {
        console.log('Error fetching average ratings:', err);
      });
  }, []);
  const StyledRatingStars = styled.div`
    display: inline-block;
    font-size: xxx-large;
    background: linear-gradient(to right, black ${avgRatingToPercent()[0]}, lightgrey ${avgRatingToPercent()[1]});
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  `;
  function avgRatingToPercent() {
    return [`${avgRating * 20}%`, `${100 - avgRating * 20}%`];
  }
  return (
    <div className="ratings-overall">
      <div style={{ fontSize: '48px' }}>{avgRating}</div>
      {/* <div className="rating-stars" style={{fontSize: 'xxx-large', background: `linear-gradient(to right, black ${avgRatingToPercent()[0]}, white ${avgRatingToPercent()[1]})`}}>☆☆☆☆☆</div> */}
      <StyledRatingStars>☆☆☆☆☆</StyledRatingStars>
    </div>
  );
}
