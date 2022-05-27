import React, { useEffect, useState } from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
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
    <Container>
      {
        current !== 0
          ? <FcPrevious className="left-arrow" onClick={prevSlide} />
          : <FcPrevious className="left-arrow transparent-arrow" />
      }
      {
        current !== maxDisplay
          ? <FcNext className="right-arrow" onClick={nextSlide} />
          : <FcNext className="right-arrow transparent-arrow" />
      }

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
  );
}

export default relatedCard;

const Container = styled.div`
position: relative;
display:flex;
justify-content: space-evenly;
align-items: center;
`;

const CardWrapper = styled.div`
display:flex;
object-fit:cover;
`;

const StyledCard = styled.div`
display: flex;
border-radius: 10px;
padding: 15px;
border-width: 5px;
border-style: solid;
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
object-fit: contain;
`;

const InfoWrapper = styled.div`
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

const Comparison = styled(AiOutlineStar)`
right:0;
top:-15px;
`;
