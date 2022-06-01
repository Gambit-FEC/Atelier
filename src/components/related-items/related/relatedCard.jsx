import React, { useEffect, useState } from 'react';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { HiEye } from 'react-icons/hi';
import styled from 'styled-components';
import CompareModal from './compareModal';
import { StyledRatingStars } from '../../../styled-lib';
import { GlobalContext, useGlobalContext } from '../../../context/GlobalStore';

function relatedCard(data) {
  const placeholder = 'http://placecorgi.com/260/180';
  const { setProductId } = useGlobalContext();
  const [current, setCurrent] = useState(0);
  const display = data.data.slice(current, (current + 4));
  const maxDisplay = data.data.length - 4;
  const [showModal, setModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);

  function newProduct(value) {
    console.log('PRODUCT ID: ', value);
    setProductId(value);
  }

  function showDisplay(e, value) {
    setModal(!showModal);
    setCurrentItem(value);
    const modal = document.getElementById('myModal');

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
  }

  function closeDisplay() {
    const modal = document.getElementById('myModal');
    setModal(!showModal);
    setCurrentItem(0);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
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
            <StyledCard key={index} onClick={() => newProduct(info.product.id)}>
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
cursor: pointer;
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
float: right;
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
position: relative;
height: 30px;
width: auto;
top: 250px;
cursor: pointer;
user-select: none;
&:hover {
  box-shadow: 0 0 10px rgba(90, 90, 90, 0.8)
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
  box-shadow: 0 0 10px rgba(90, 90, 90, 0.8)
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
