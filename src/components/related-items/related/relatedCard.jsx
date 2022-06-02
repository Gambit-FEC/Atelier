import React, { useEffect, useState } from 'react';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { HiEye } from 'react-icons/hi';
import styled from 'styled-components';
import CompareModal from './compareModal';
import { StyledRatingStars } from '../../../styled-lib';
import { useGlobalContext } from '../../../context/GlobalStore';

function relatedCard(data) {
  const { setProductId } = useGlobalContext();
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

  function newProductState(value) {
    setProductId(value);
  }

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

      <CardWrapper>
        {
          display.map((info, index) => (
            <StyledCard key={index}>
              <Comparison onClick={(e) => showDisplay(e, info.product.id)} />
              <ImageContainer onClick={() => newProductState(info.product.id)}>
                <StyleImg src={
                  info.style.thumbnail_url === null ? placeholder : info.style.thumbnail_url
                }
                />
              </ImageContainer>
              <InfoWrapper value={info.product.id} onClick={() => newProductState(info.product.id)}>
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

const Comparison = styled(HiEye)`
height: 30px;
width: auto;
position: relative;
float: right;
margin: 5px;
padding-bottom: 5px;
cursor: pointer;
&:hover {
  color: #9F2B68
}
`;

const InfoWrapper = styled.div`
padding-top: 30px;
text-align:center;
cursor: pointer;
padding-bottom: 10px;
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
