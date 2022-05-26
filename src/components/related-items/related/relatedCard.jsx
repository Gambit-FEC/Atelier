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
  const [currentRelatedProducts, setCurrentRelatedProducts] = useState([]);

  // save data coming as a variable
  // set that variable as a state
  // on click favorite -> change that variable data favorite to the clicked favorite
  // set state as the new data

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

  function favoriteClick(selectedId, isFavorited) {
    const copyOfRelatedProducts = [...currentRelatedProducts];
    const foundIndex = copyOfRelatedProducts.findIndex((p) => p.product.id === selectedId);
    if (foundIndex > -1) {
      copyOfRelatedProducts[foundIndex].favorite = isFavorited;
      setCurrentRelatedProducts(copyOfRelatedProducts);
    }
  }

  const nextSlide = () => {
    setCurrent(current === maxDisplay ? current : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? 0 : current - 1);
  };

  useEffect(() => {
    setCurrent(0);
    setCurrentRelatedProducts(display);
  }, [data.data]);

  return (
    <Container>
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
        currentRelatedProducts.map((info, index) => (
          <StyledCard key={index}>
            {
              (info.favorite)
                ? <AiFillStar onClick={() => favoriteClick(info.product.id, false)} />
                : <AiOutlineStar onClick={() => favoriteClick(info.product.id, true)} />
              }
            <div
              key={index}
              value={info.product.id}
              onClick={(e) => showDisplay(e, info.product.id)}
            >
              <StyleImg src={
              info.style.thumbnail_url === null ? placeholder : info.style.thumbnail_url
            } />
              <InfoWrapper value={info.product.id}>
                <CategoryWrapper>
                  {info.product.category}
                </CategoryWrapper>
                <NameWrapper>
                  {info.product.name}
                </NameWrapper>
                <PriceWrapper>
                  $
                  { info.product.price }
                </PriceWrapper>
                <StyledRatingStars rating={info.rating.averageRating}>
                  ★★★★★
                </StyledRatingStars>
              </InfoWrapper>
            </div>
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
