import React, { useEffect, useState } from 'react';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';
import { FiPlusSquare } from 'react-icons/fi';
import styled from 'styled-components';
import { StyledRatingStars } from '../../../styled-lib';

export function EmptyCard({ addCard }) {
  return (
    <EmptyStyledCard onClick={() => addCard()}>
      <EmptyInfoWrapper>
        <PlusAddIcon />
        <OutfitText>
          Add to Outfit
        </OutfitText>
      </EmptyInfoWrapper>
    </EmptyStyledCard>
  );
}

export function OutfitCard({ data, removeCard, addCard }) {
  const placeholder = 'http://placecorgi.com/260/180';
  const [current, setCurrent] = useState(0);
  const display = data.slice(current, (current + 3));
  const maxDisplay = data.length - 3;

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
            <ImageContainer>
              <StyleImg src={
                info.style.thumbnail_url === null ? placeholder : info.style.thumbnail_url
              }
              />
            </ImageContainer>
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
        current !== maxDisplay && display.length >= 3
          ? <NextArrow onClick={nextSlide} />
          : <NextArrowTrans />
      }
    </OutfitList>
  );
}
const OutfitList = styled.div`
display: flex;
flex-direction: row;
`;

const EmptyStyledCard = styled.div`
border-radius: 10px;
width: 300px;
height: fit-content;
margin: 15px;
flex-direction: column;
flex-wrap: nowrap;
align-items: center;
justify-content: space-between;
cursor: pointer;
padding-bottom: 35px;
&:hover {
  color: #9F2B68
}
`;

const StyledCard = styled.div`
border-radius: 10px;
width: 300px;
height: fit-content;
margin: 15px;
flex-direction: column;
flex-wrap: nowrap;
align-items: center;
justify-content: space-between;
&:hover {
  box-shadow: 0 0 10px #9F2B68
  }
`;

const ImageContainer = styled.div`
height: 250px;
width: 300px;
object-fit: cover;
`;

const StyleImg = styled.img`
display: block;
background-size: contain;
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 10px;
cursor: pointer;
overflow: hidden;
`;

const InfoWrapper = styled.div`
padding-top: 30px;
text-align:center;
cursor: pointer;
`;

const EmptyInfoWrapper = styled.div`
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
float: right;
margin: 5px;
cursor: pointer;
&:hover {
  color: #9F2B68
}
`;

const OutfitText = styled.p`
font-size: 30px;
font-weight: bold;
`;

const PlusAddIcon = styled(FiPlusSquare)`
position: relative;
height: 300px;
width: 100%;
cursor: pointer;
`;

const NextArrow = styled(BiChevronRightCircle)`
position: relative;
height: 30px;
width: auto;
top: 250px;
cursor: pointer;
user-select: none;
&:hover {
  color: #9F2B68
}
`;

const NextArrowTrans = styled(BiChevronRightCircle)`
position: relative;
height: 30px;
width: auto;
top: 250px;
cursor: default;
user-select: none;
opacity: 0.01;
`;

const PrevArrow = styled(BiChevronLeftCircle)`
position: relative;
height: 30px;
width: auto;
top: 250px;
cursor: pointer;
user-select: none;
&:hover {
  color: #9F2B68
}
`;

const PrevArrowTrans = styled(BiChevronLeftCircle)`
position: relative;
height: 30px;
width: auto;
top: 250px;
cursor: default;
user-select: none;
opacity: 0.01;
`;
