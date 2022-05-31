import React, { useEffect, useState } from 'react';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { HiEye } from 'react-icons/hi';
import styled from 'styled-components';
import CompareModal from './compareModal';
import { StyledRatingStars } from '../../../styled-lib';

function relatedCard(data) {
  const placeholder = 'http://placecorgi.com/260/180';
  const [current, setCurrent] = useState(0);
  const display = data.data.slice(current, (current + 4));
  const maxDisplay = data.data.length - 4;
  const [showModal, setModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);

  function showDisplay(e, value) {
    setModal(!showModal);
    setCurrentItem(value);
    const modal = document.getElementById('myModal');

    modal.style.display = 'block';
  }

  function closeDisplay() {
    const modal = document.getElementById('myModal');
    setModal(!showModal);
    setCurrentItem(0);
    modal.style.display = 'none';
  }

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
    <RelatedList>
      {
        current !== 0
          ? <PrevArrow onClick={prevSlide} />
          : <PrevArrowTrans />
      }
      <Container>

        <div id="myModal" className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={closeDisplay}
            >
              &times;
            </span>
            {showModal ? <CompareModal value={currentItem} /> : null}
          </div>
        </div>
        {
          console.log(display)
        }

        <CardWrapper>
          {
            display.map((info, index) => (
              <StyledCard key={index}>
                <Comparison onClick={(e) => showDisplay(e, info.product.id)} />
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
        </CardWrapper>
      </Container>
      {
        current !== maxDisplay
          ? <NextArrow onClick={nextSlide} />
          : <NextArrowTrans />
      }
    </RelatedList>
  );
}

export default relatedCard;

const RelatedList = styled.div`
display: flex;
flex-direction: row;
max-width: 1199px;
`;

const Container = styled.div`
// position: relative;
// display:flex;
// justify-content: space-evenly;
`;

const CardWrapper = styled.div`
display:flex;
object-fit:cover;
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
&:hover {
  box-shadow: 0 0 10px rgba(90, 90, 90, 0.8)
}
`;

const StyleImg = styled.img`
width: 100%;
height: 250px;
object-fit: fill;
align-items: center;
position: relative;
cursor: pointer;
`;

const Comparison = styled(HiEye)`
height: 20px;
width: auto;
position: relative;
top: -7px;
right: -190px;
margin: 5px;
padding-bottom: 5px;
cursor: pointer;
`;

const InfoWrapper = styled.div`
text-align:center;
  background-color: white;
`;

const CategoryWrapper = styled.p`
font-weight: normal;
text-transform: uppercase;
font-size: 16px;
`;
const NameWrapper = styled.p`
font-weight: bold;
font-size: 18px;
`;
const PriceWrapper = styled.p`
font-weight: normal;
font-size: 16px;
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

const NextArrowTrans = styled(BiChevronRightCircle)`
position relative;
bottom: 301px;
left: 1212px;
height: 50px;
width: auto;
user-select: none;
cursor: default;
// opacity: 0.01;
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

const PrevArrowTrans = styled(BiChevronLeftCircle)`
position: relative;
top: 282px;
right: 56px;
height: 50px;
width: auto;
user-select: none;
cursor: default;
// opacity: 0.01;
`;
