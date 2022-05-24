import styled from 'styled-components';

function ratingToPercent(rating) {
  return `${rating * 20}%`;
}

// takes rating and size props
const StyledRatingStars = styled.div`
  display: inline-block;
  font-size: ${({ size }) => size};
  background: linear-gradient(to right, black ${({ rating }) => ratingToPercent(rating)}, lightgrey ${({ rating }) => ratingToPercent(rating)});
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

const RatingBar = styled.div`
background: linear-gradient(to right, black ${({ percent }) => percent + '%'}, lightgrey ${({ percent }) => percent + '%'});
width: 125px;
height: 8px;
`;

export { StyledRatingStars, RatingBar };
