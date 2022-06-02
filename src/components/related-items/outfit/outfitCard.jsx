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
        <OutfitButton>
          Add Outfit!
        </OutfitButton>
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
          <StyledCard key={index} className="style-card">
            <Cancel onClick={() => { removeCard(info.product.id); }} />
            <HoverCard className="hover-card">
              <ImageContainer className="image-container">
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
            </HoverCard>
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

const HoverCard = styled.div`
border-radius: 10px;
width: 300px;
height: auto;
margin: 15px;
flex-direction: column;
flex-wrap: nowrap;
align-items: center;
&:hover {
  box-shadow: 0 0 10px #9F2B68
  }
`;

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
cursor: pointer;
padding-bottom: 390px;
`;

const StyledCard = styled.div`
`;

const ImageContainer = styled.div`
position: relative;
top: 30px;
height: 250px;
width: 300px;
`;

const StyleImg = styled.img`
position: relative;
top: -27px;
display: block;
background-size: contain;
width: 100%;
height: 100%;
border-radius: 10px;
object-fit: cover;
cursor: pointer;
overflow: hidden;
`;

const InfoWrapper = styled.div`
padding-top: 30px;
padding-bottom: 10px;
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
height: 30px;
width: auto;
position: relative;
float: right;
margin: 5px;
cursor: pointer;
&:hover {
  color: #FF0000
}
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

const OutfitButton = styled.button`
  top: 230px;
  background-color: #CC66CC;
  border: 0 solid #E5E7EB;
  box-sizing: border-box;
  color: #000000;
  font-family: ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: .75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 100%;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &:focus {
    outline: 0;
  }
  &:after {
    content: '';
    position: absolute;
    border: 1px solid #000000;
    bottom: 4px;
    left: 4px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
  }

  &:hover:after {
    bottom: 2px;
    left: 2px;
  }
  @media (min-width: 768px) {
    .button-53 {
      padding: .75rem 3rem;
      font-size: 1.25rem;
    }
  }
}
`;
