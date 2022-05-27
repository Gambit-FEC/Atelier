import React, { useEffect, useState } from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { GiCancel } from 'react-icons/gi';
import styled from 'styled-components';
import { StyledRatingStars } from '../../../styled-lib';

export function EmptyCard({ addCard }) {
  return (
    <StyledCard onClick={() => addCard()}>
      <InfoWrapper>
        EMPTY CARD
      </InfoWrapper>
    </StyledCard>
  );
}

export function OutfitCard({ data, removeCard, addCard }) {
  console.log('OUTFIT CARD', data);
  const placeholder = 'http://placecorgi.com/260/180';
  const [current, setCurrent] = useState(0);
  const display = data.slice(current, (current + 4));
  const maxDisplay = data.length - 4;

  const nextSlide = () => {
    setCurrent(current === maxDisplay ? current : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? 0 : current - 1);
  };

  useEffect(() => {
    setCurrent(0);
  }, [data]);

  return (
    <Container className="Container">
      <EmptyCard addCard={() => { addCard(); }} />
      {
        current !== 0
          ? <FcPrevious className="left-arrow" onClick={prevSlide} />
          : null
      }
      {
        current === 4
          ? <FcNext className="right-arrow" onClick={nextSlide} />
          : null
      }
      {
        display.map((info, index) => (
          <StyledCard key={index}>
            <GiCancel onClick={() => { removeCard(info.product.id); }} />
            <StyleImg src={
              info.style.thumbnail_url === null ? placeholder : info.style.thumbnail_url
            }
            />
            <InfoWrapper value={info.product.id}>
              <CategoryWrapper>
                {info.product.category}
              </CategoryWrapper>
              <NameWrapper>
                {info.product.name}
              </NameWrapper>
              <PriceWrapper>
                $
                {info.product.price}
              </PriceWrapper>
              <StyledRatingStars rating={info.rating.averageRating}>
                ★★★★★
              </StyledRatingStars>
            </InfoWrapper>
          </StyledCard>
        ))
      }
    </Container>
  );
}
const Container = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
`;

const StyledCard = styled.div`
border-radius: 10px;
padding: 15px;
border-width: 5px;
border-style: solid;
max-width: 300px;
width: 20%;
height: 420px;
margin: 10px;
align-items: center;
justify-content: space-between;
&:hover {
  box-shadow: 0 0 10px rgba(90, 90, 90, 0.8)
}
`;

const StyleImg = styled.img`
width: 100%;
height: 250px;
object-fit: contain;
`;

const InfoWrapper = styled.div`
  background-color: white;
`;

const CategoryWrapper = styled.p`
font-weight: normal;
text-transform: uppercase;
font-size: 16px;
align-items: center;
`;
const NameWrapper = styled.p`
font-weight: bold;
font-size: 18px;
align-items: center;
`;
const PriceWrapper = styled.p`
font-weight: normal;
font-size: 16px;
align-items: center;
`;
