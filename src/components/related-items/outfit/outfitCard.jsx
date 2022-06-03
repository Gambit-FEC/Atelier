import React, { useEffect, useState, useRef } from 'react';
import { GiCancel } from 'react-icons/gi';
import styled from 'styled-components';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { StyledRatingStars } from '../../../styled-lib';

export function EmptyCard({ addCard }) {
  return (

    <EmptyStyledCard>
      <EmptyInfoWrapper>
        <OutfitButton onClick={() => addCard()}>
          <AddOutfit>
            Add Outfit
          </AddOutfit>
        </OutfitButton>
      </EmptyInfoWrapper>
    </EmptyStyledCard>
  );
}

export function OutfitCard({ data, removeCard, addCard }) {
  const placeholder = 'http://placecorgi.com/260/180';
  const [indexItem, setIndex] = useState(0);
  const listRef = useRef(null);
  const maxDisplay = data.length - 3;

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: -332,
        behavior: 'smooth',
      });
    }
    if (indexItem > 0) {
      setIndex((indexItem - 1));
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: +332,
        behavior: 'smooth',
      });
    }
    if (indexItem < maxDisplay) {
      setIndex((indexItem + 1));
    }
  };

  useEffect(() => {
    listRef.current.scrollLeft = 0;
    setIndex(0);
  }, [data]);

  return (
    <OutfitList>
      {
        indexItem !== 0
          ? (
            <ArrowButton onClick={scrollLeft}>
              <PrevArrow />
            </ArrowButton>
          )
          : (
            <ArrowButtonTrans>
              <PrevArrowTrans />
            </ArrowButtonTrans>
          )
      }
      <CardWrapper ref={listRef}>
        <EmptyCard addCard={() => { addCard(); }} />
        {
          data.map((info, index) => (
            <StyledCard key={index} className="style-card">
              <HoverCard className="hover-card">
                <ImageContainer className="image-container">
                  <StyleImg src={
                    info.style.photo.thumbnail_url === null
                      ? placeholder : info.style.photo.thumbnail_url
                  }
                  />
                  <CancelButton>
                    <Cancel onClick={() => { removeCard(info.product.id); }} />
                  </CancelButton>
                </ImageContainer>
                <InfoWrapper value={info.product.id}>
                  <CategoryWrapper>
                    {info.product.category}
                  </CategoryWrapper>
                  <NameWrapper>
                    {info.product.name}
                  </NameWrapper>
                  {
                  (info.style.sale)
                    ? (
                      <PriceWrapper>
                        <OriginalPrice>
                          $
                          {info.style.price}
                        </OriginalPrice>
                        <SalePrice>
                          $
                          {info.style.sale}
                        </SalePrice>
                      </PriceWrapper>
                    )
                    : (
                      <PriceWrapper>
                        $
                        {info.style.price}
                      </PriceWrapper>
                    )
                }
                  <StyledRatingStars rating={info.rating.averageRating}>
                    ★★★★★
                  </StyledRatingStars>
                </InfoWrapper>
              </HoverCard>
            </StyledCard>
          ))
        }
      </CardWrapper>
      {
        indexItem !== maxDisplay && data.length >= 3
          ? (
            <ArrowButton onClick={scrollRight}>
              <NextArrow />
            </ArrowButton>
          )
          : (
            <ArrowButtonTrans>
              <NextArrowTrans />
            </ArrowButtonTrans>
          )

      }
    </OutfitList>
  );
}
const CardWrapper = styled.div`
display:flex;
overflow-y: hidden;
overflow-x: hidden;
&::-webkit-scrollbar{
  overflow-x: hidden;
  overflow-y: hidden;
}
`;

const AddOutfit = styled.p`
font-size: 25px;
color: #fff;
text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
`;

const HoverCard = styled.div`
border-radius: 10px;
width: 300px;
height: auto;
margin: 15px;
flex-direction: column;
flex-wrap: nowrap;
align-items: center;
border: 1px solid #ddd;
&:hover {
  box-shadow: 0 0 10px #9F2B68
  }
`;

const OutfitList = styled.div`
display: flex;
align-items: flex-start;
max-width: 1420px;
overflow-y: hidden;
overflow-x: hidden;
`;

const EmptyStyledCard = styled.div`
border-radius: 10px;
min-width: 300px;
height: 446px;
margin: 15px;
flex-direction: column;
flex-wrap: nowrap;
align-items: center;
border: 1px solid #ddd;
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
top: -30px;
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
position: relative;
top: -25px;
`;

const EmptyInfoWrapper = styled.div`
style: block;
text-align: center;
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

const PriceWrapper = styled.div`
font-weight: normal;
font-size: 16px;
padding-bottom: 10px;
`;

const OriginalPrice = styled.span`
text-decoration: line-through;
`;

const SalePrice = styled.span`
color: red;
padding-left: 5px;
`;

const CancelButton = styled.button`
position: relative;
top: -280px;
left: 270px;
cursor: pointer;
height: 30px;
width: 30px;
border-top-right-radius: 10px;
border-bottom-left-radius: 10px;
background-color: white;
box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
&:active {
  box-shadow: 0 1px #666;
}
`;

const Cancel = styled(GiCancel)`
position: relative;
left: -5px;
width: 25px;
height: 25px;
position: relative;
&:hover {
  color: #FF0000
}
`;

const NextArrow = styled(MdArrowForwardIos)`
position: relative;
height: 30px;
width: auto;
cursor: pointer;
user-select: none;
top: 3px;
`;

const NextArrowTrans = styled(MdArrowForwardIos)`
position: relative;
height: 30px;
width: auto;
top: 3px;
cursor: default;
user-select: none;
visibility: hidden;
`;

const PrevArrow = styled(MdArrowBackIosNew)`
position: relative;
height: 30px;
width: auto;
top: 3px;
cursor: pointer;
user-select: none;
`;

const PrevArrowTrans = styled(MdArrowBackIosNew)`
position: relative;
height: 30px;
width: auto;
top: 3px;
cursor: default;
user-select: none;
visibility: hidden;
`;

const OutfitButton = styled.button`
  top: 100px;
  background-color: #9F2B68;
  border: 0 solid black;
  box-sizing: border-box;
  color: #000000;
  font-size: 1rem;
  font-weight: 700;
  justify-content: space-between;
  line-height: 1.75rem;
  padding: .75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 200px;
  height: 200px;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  border-radius: 50%;
  &:hover {
    box-shadow: 0 0 50px #9F2B68
    }
  &:focus {
    outline: 0;
  }
// BEY BLADE MODE
//   animation-name: spin;
//   animation-duration: 100ms;
//   animation-iteration-count: infinite;
//   animation-timing-function: linear;
//   @keyframes spin {
//     from {
//         transform:rotate(0deg);
//     }
//     to {
//         transform:rotate(360deg);
//     }
// }
`;

const ArrowButton = styled.button`
height: 50px;
width: 50px;
align-items: center;
position: relative;
top: 250px;
cursor: pointer;
background-color: white;
border: 2px solid #9F2B68;
border-radius: 5px;
`;

const ArrowButtonTrans = styled.button`
height: 50px;
width: 50px;
align-items: center;
position: relative;
top: 250px;
cursor: pointer;
visibility: hidden;
`;
