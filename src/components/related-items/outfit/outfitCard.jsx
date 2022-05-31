import React, { useEffect, useState } from 'react';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';
import { FiPlusSquare } from 'react-icons/fi';
import styled from 'styled-components';
import { StyledRatingStars } from '../../../styled-lib';

export function EmptyCard({ addCard }) {
  return (
    <StyledCard onClick={() => addCard()}>
      <InfoWrapper>
        <OutfitText>
          Add to Outfit
        </OutfitText>
        <PlusAddIcon />
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
    <OutfitList>
      <Container className="Container">
        {
          current !== 0
            ? <PrevArrow onClick={prevSlide} />
            : <PrevArrowTrans />
        }
        <EmptyCard addCard={() => { addCard(); }} />
        {
          display.map((info, index) => (
            <StyledCard key={index}>
              <Cancel onClick={() => { removeCard(info.product.id); }} />
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
        {
          current > 4
            ? <NextArrow onClick={nextSlide} />
            : <NextArrowTrans />
        }
      </Container>
    </OutfitList>
  );
}
const OutfitList = styled.div`
display: flex;
flex-direction: row;
max-width: 1199px;
`;

const Container = styled.div`
position: relative;
display: flex;
justify-content: flex-start;
`;

const StyledCard = styled.div`
border-radius: 10px;
padding: 20px;
border-width: 5px;
border-style: solid;
width: 270px;
height: 450px;
margin: 15px;
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
object-fit: fill;
`;

const InfoWrapper = styled.div`
style: block;
text-align: center;
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

const Cancel = styled(GiCancel)`
height: 20px;
width: auto;
position: relative;
top: -7px;
right: -270px;
margin: 5px;
padding-bottom: 15px;
cursor: pointer;
`;

const OutfitText = styled.p`
font-size: 30px;
font-weight: bold;
`;
const PlusAddIcon = styled(FiPlusSquare)`
position: relative;
height: 300px;
width: 100%;
`;

const NextArrow = styled(BiChevronRightCircle)`
position relative;
bottom: 301px;
left: 1212px;
height: 50px;
width: auto;
user-select: none;
cursor: pointer;
`;

const PrevArrow = styled(BiChevronLeftCircle)`
position: relative;
top: 282px;
right: 56px;
height: 50px;
width: auto;
user-select: none;
cursor: pointer;
`;

const NextArrowTrans = styled(BiChevronRightCircle)`
position relative;
bottom: 301px;
left: 1212px;
height: 50px;
width: auto;
user-select: none;
cursor: default;
`;

const PrevArrowTrans = styled(BiChevronLeftCircle)`
position: relative;
top: 282px;
right: 56px;
height: 50px;
width: auto;
user-select: none;
cursor: default;
`;
