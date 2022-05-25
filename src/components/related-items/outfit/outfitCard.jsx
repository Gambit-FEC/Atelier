import React, { useEffect, useState } from 'react';
import { FcNext, FcPrevious} from 'react-icons/fc';
import styled from 'styled-components';
import { StyledRatingStars } from '../../../styled-lib';

function outfitCard(data) {
  const placeholder = 'http://placecorgi.com/260/180';
  const [current, setCurrent] = useState(0);
  const display = data.data.slice(current, (current + 4));
  const maxDisplay = data.data.length - 1;
  console.log(data);

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
    <Container>
      {/* <FcPrevious className="left-arrow" />
      <FcNext className="right-arrow" /> */}
      {
        current !== 0
          ? <FcPrevious className="left-arrow" onClick={prevSlide} />
          : null
      }
      {
        current !== 0
          ? <FcNext className="right-arrow" onClick={nextSlide} />
          : null
      }
      {
      <CardWrapper>{
        display.map((info, index) => {
          return (
            <StyledCard key={index}>
            <ImageWrapper>
            <StyleImg src={
              info.style.thumbnail_url === null ? placeholder : info.style.thumbnail_url
            }/>
            </ImageWrapper>
            <InfoWrapper>
            {info.product.category}
            {info.product.name}
            ${info.product.price}
            <StyledRatingStars rating={info.rating.averageRating} >
            ★★★★★
            </StyledRatingStars>
            </InfoWrapper>
            </StyledCard>
          )
        })}
      </CardWrapper>
      }
    </Container>
  );
}

export default outfitCard;

const Container = styled.div`
  position: relative;
  justify-content: space-evenly;
  align-items: center;
`

const CardWrapper = styled.div`
  display:flex;
  object-fit:cover;
`

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
    &:hover {
      box-shadow: 0 0 10px rgba(90, 90, 90, 0.8)
    }
`;

const StyleImg = styled.img`
  width: 100%;
  height: 250px;
  background-style: contain;
`;

const InfoWrapper = styled.div`
  background-color: white;
`
const ImageWrapper = styled.div`
  background-color: grey;
`