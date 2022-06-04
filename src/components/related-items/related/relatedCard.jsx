import React, { useEffect, useState, useRef } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import styled from 'styled-components';
import CompareModal from './compareModal';
import { StyledRatingStars } from '../../../styled-lib';
import { useGlobalContext } from '../../../context/GlobalStore';

function RelatedCard({ data }) {
  const { setProductId } = useGlobalContext();
  const placeholder = 'http://placecorgi.com/260/180';
  const maxDisplay = data.length - 4;
  const listRef = useRef(null);
  const [indexItem, setIndex] = useState(0);
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

  function scrollLeft() {
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
  }

  function scrollRight() {
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
  }

  function newProductState(value) {
    setProductId(value);
  }

  useEffect(() => {
    listRef.current.scrollLeft = 0;
    setIndex(0);
  }, [data]);

  return (
    <RelatedList>
      {
        indexItem !== 0
          ? (
            <ArrowButton onClick={() => scrollLeft()} aria-label="prev">
              <PrevArrow />
            </ArrowButton>
          )
          : (
            <ArrowButtonTrans aria-label="prev-trans">
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

      <CardWrapper ref={listRef}>
        {
          data.map((info, index) => (
            <StyledCard key={index}>
              <ImageContainer>
                <StyleImg
                  src={info.style.photo.thumbnail_url === null
                    ? placeholder : info.style.photo.thumbnail_url}
                  onClick={() => newProductState(info.product.id)}
                  alt="image"
                />
                <CompareButton onClick={() => showDisplay(info.product.id)} aria-label="compare">
                  <i className="fa-solid fa-magnifying-glass" />
                </CompareButton>
                {
                  (info.style.sale)
                    ? (
                      <PriceWrapper>
                        <OriginalPrice>
                          $
                          {Math.trunc(info.style.price)}
                        </OriginalPrice>
                        <SalePrice>
                          $
                          {Math.trunc(info.style.sale)}
                        </SalePrice>
                      </PriceWrapper>
                    )
                    : (
                      <PriceWrapper>
                        $
                        {Math.trunc(info.style.price)}
                      </PriceWrapper>
                    )
                }
              </ImageContainer>
              <InfoWrapper value={info.product.id} onClick={() => newProductState(info.product.id)}>
                <NameWrapper>
                  {info.product.name}
                </NameWrapper>
                <CatAndStars>
                  <CategoryWrapper>
                    {info.product.category}
                  </CategoryWrapper>
                  <StyledRatingStars rating={info.rating.averageRating}>
                    ★★★★★
                  </StyledRatingStars>
                </CatAndStars>
              </InfoWrapper>
            </StyledCard>
          ))
        }
      </CardWrapper>
      {
        indexItem !== maxDisplay && data.length > 4
          ? (
            <ArrowButton onClick={() => scrollRight()} aria-label="next">
              <NextArrow />
            </ArrowButton>
          )
          : (
            <ArrowButtonTrans aria-label="next-trans">
              <NextArrowTrans />
            </ArrowButtonTrans>
          )
      }
    </RelatedList>
  );
};

export default RelatedCard;

const RelatedList = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 1420px;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const CompareButton = styled.button`
  position: relative;
  top: -350px;
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
  overflow-y: hidden;
  overflow-x: hidden;
  &::-webkit-scrollbar{
    overflow-x: hidden;
    overflow-y: hidden;
  }
`;

const StyledCard = styled.div`
  border-radius: 10px;
  width: 300px;
  height: fit-content;
  margin: 15px;
  align-items: center;
  border: 1px solid #ddd;
  &:hover {
    box-shadow: 0 0 10px #9F2B68
    }
`;

const ImageContainer = styled.div`
  height: 350px;
  width: 300px;
  object-fit: cover;
  align-text: center;
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
  margin: 10px;
  cursor: pointer;
`;

const CatAndStars = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CategoryWrapper = styled.p`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const NameWrapper = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin: 0px;
`;

const PriceWrapper = styled.div`
  transform: translate(0px, -25px);
  font-weight: normal;
  font-size: 16px;
  background-color: white;
  width: min-content;
  padding: 2px;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: grey;
`;

const SalePrice = styled.span`
  color: red;
  padding-left: 5px;
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
