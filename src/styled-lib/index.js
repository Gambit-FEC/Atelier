import styled from 'styled-components';

function avgRatingToPercent(rating) {
  console.log(rating);
  return [`${rating * 20}%`, `${100 - rating * 20}%`];
}

const StyledRatingStars = styled.div`
  display: inline-block;
  font-size: xxx-large;
  background: linear-gradient(to right, black ${({ rating }) => avgRatingToPercent(rating)[0]}, lightgrey ${({ rating }) => avgRatingToPercent(rating)[1]});
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

export default StyledRatingStars;
