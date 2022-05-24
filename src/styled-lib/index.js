import styled from 'styled-components';

function avgRatingToPercent(rating) {
  return [`${rating * 20}%`, `${100 - rating * 20}%`];
}

const StyledRatingStars = styled.div`
  display: inline-block;
  font-size: ${({ size }) => size };
  background: linear-gradient(to right, purple ${({ rating }) => avgRatingToPercent(rating)[0]}, black ${({ rating }) => avgRatingToPercent(rating)[1]});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-stroke: 1px black;
  color: transparent;
`;

export default StyledRatingStars;
