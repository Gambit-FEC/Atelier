import React, { useEffect, useState } from 'react';
import { FcNext, FcPrevious} from 'react-icons/fc';
import '../carousel/Carousel.css';
import styled from 'styled-components';
import StyledRatingStars from '../../../styled-lib';

function relatedCard(data) {
  const placeholder = 'http://placecorgi.com/260/180';
  const [current, setCurrent] = useState(0);
  const display = data.data.slice(current, (current + 4));
  const maxDisplay = data.data.length - 4;
  // const length = data.data.length;

  console.log(data.data);
  // console.log(length);

  const nextSlide = () => {
    setCurrent(current === maxDisplay ? current : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? 0 : current - 1);
  };

  useEffect(() => {
    setCurrent(0);
  }, [data.data]);

  return (
    <section className="slider">
      {/* <FcPrevious className="left-arrow" />
      <FcNext className="right-arrow" /> */}
      {
        current !== 0
          ? <FcPrevious className="left-arrow" onClick={prevSlide} />
          : null
      }
      {
        current !== maxDisplay
          ? <FcNext className="right-arrow" onClick={nextSlide} />
          : null
      }
      {
        display.map((info, index) => {
          return (
            <StyledCard key={index}>
            <StyleImg src={
              info.style.thumbnail_url === null ? placeholder : info.style.thumbnail_url
            }/>
            <p>{info.product.category}</p>
            <p>{info.product.name}</p>
            <p>${info.product.price}</p>
            {/* <p> {info.rating.averageRating}</p> */}
            <StyledRatingStars rating={info.rating.averageRating} />
            ★★★★★
            </StyledCard>
          )
        })
      }
    </section>
  );
}

export default relatedCard;

const StyledCard = styled.div`
    display: flex;
    border-radius: 10px;
    padding: 15px;
    border-width: 5px;
    border-style: solid;
    max-width: 300px;
    width: 20%;
    height: 420px;
    margin: 10px;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
`;

const StyleImg = styled.img`
  max-width: 100%;
  max-height: 200px;
  display: block;
  margin: 0 auto;
`;
// .container .box {
//   width:540px;
//   margin:50px;
//   display:table;
// }
// .container .box .box-row {
//   display:table-row;
// }
// .container .box .box-cell {
//   display:table-cell;
//   border:1px solid black;
//   width:25%;
//   padding:10px;
// }
