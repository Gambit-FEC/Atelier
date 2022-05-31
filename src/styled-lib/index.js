import styled from 'styled-components';
import { GoTriangleDown } from 'react-icons/go';

function ratingToPercent(rating) {
  return `${rating * 20}%`;
}

// takes rating, [border], [size] props
const StyledRatingStars = styled.div`
  display: inline-block;
  font-size: ${({ size }) => size};
  background: linear-gradient(to right, purple ${({ rating }) => ratingToPercent(rating)}, white ${({ rating }) => ratingToPercent(rating)});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-stroke: ${({ border }) => (border || '1') + 'px'} black;
  color: transparent;
`;

const RatingBar = styled.div`
  background: linear-gradient(to right, black ${({ percent }) => percent + '%'}, lightgrey ${({ percent }) => percent + '%'});
  height: 8px;
`;

const StarButton = styled.span`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: ${({ color }) => color};
  text-decoration: underline;
  cursor: pointer;
`;

const CharacteristicsBar = styled.div`
  background: linear-gradient(to right, lightgrey 24.5%, white 24.5%, white 25.5%, lightgrey 25.5%, lightgrey 49.5%, white 49.5%, white 50.5%, lightgrey 50.5%, lightgrey 74.5%, white 74.5%, white 75.5%, lightgrey 75.5%);
  height: 8px;
  margin-top: 8px;
`;

const CharacteristicsPointer = styled(GoTriangleDown)`
  position: relative;
  top: -11px;
  left: ${({ position }) => `${position - 2.7}%`};
  `;
  // left: -2.7%;
export {
  StyledRatingStars,
  RatingBar,
  StarButton,
  CharacteristicsBar,
  CharacteristicsPointer,
};
