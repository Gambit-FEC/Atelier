import styled from 'styled-components';

function ratingToPercent(rating) {
  return `${rating * 20}%`;
}

// takes rating and size props
const StyledRatingStars = styled.div`
  display: inline-block;
  font-size: ${({ size }) => size};
  background: linear-gradient(to right, purple ${({ rating }) => ratingToPercent(rating)}, black ${({ rating }) => ratingToPercent(rating)});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-stroke: 1px black;
  color: transparent;
`;

const RatingBar = styled.div`
  background: linear-gradient(to right, black ${({ percent }) => percent + '%'}, lightgrey ${({ percent }) => percent + '%'});
  width: 125px;
  height: 8px;
`;

const StarButton = styled.div`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: ${({ color }) => color};
  text-decoration: underline;
  cursor: pointer;
`

export { StyledRatingStars, RatingBar, StarButton };
