import React, { useEffect, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
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

  function showDisplay(value) {
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
          ? (
            <ArrowButton onClick={prevSlide}>
              <PrevArrow />
            </ArrowButton>
          )
          : (
            <ArrowButtonTrans>
              <PrevArrowTrans />
            </ArrowButtonTrans>
          )
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
              <ImageContainer>
                <StyleImg
                  src={info.style.thumbnail_url === null ? placeholder : info.style.thumbnail_url}
                  onClick={() => newProductState(info.product.id)}
                />
                <CompareButton onClick={() => showDisplay(info.product.id)}>
                  <i className="fa-solid fa-magnifying-glass" />
                </CompareButton>
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
          ? (
            <ArrowButton onClick={nextSlide}>
              <NextArrow />
            </ArrowButton>
          )
          : (
            <ArrowButtonTrans>
              <NextArrowTrans />
            </ArrowButtonTrans>
          )
      }
    </RelatedList>
  );
}

export default relatedCard;

const RelatedList = styled.div`
display: flex;
flex-direction: row;
`;

const CompareButton = styled.button`
position: relative;
top: -250px;
float: right;
cursor: pointer;
height: 30px;
width: 30px;
opacity: 0.8;
border-top-right-radius: 10px;
border-bottom-left-radius: 10px;
background-color: white;
font-size: 16px;
box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
&:active {
  box-shadow: 0 1px #666;
}
&:hover{
  color: #9F2B68;
}
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
border: 1px solid #ddd;
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
padding-bottom: 10px;
position: relative;
top: -25px;
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

const ArrowButton = styled.button`
height: 50px;
width: 50px;
align-items: center;
position: relative;
top: 250px;
cursor: pointer;
background-color: white;
border: #9F2B68;
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
