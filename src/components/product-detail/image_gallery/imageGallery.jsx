import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalStore';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { AiOutlineExpand } from 'react-icons/ai';

export default function ImageGallery({productInfo, currentStyle}) {
  const { productId } = useGlobalContext();
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState(productInfo[currentStyle].photos);
  const { length } = images;
  const [showModel, setShowModel] = useState(false);

  // onClick functionalities for slides -------------
  const onLeftClick = (e) => {
    console.log('left');
    e.stopPropagation()
    setCurrentImage(currentImage === 0 ? length - 1 : currentImage - 1);
  };

  const onRightClick = (e) => {
    console.log('right');
    e.stopPropagation()
    setCurrentImage(currentImage === length - 1 ? 0 : currentImage + 1);
  };

  const showSelectedImage = (image, e) => {
    if (e) {
      e.stopPropagation();
    }
    setCurrentImage(image);
  }

  useEffect(() => {
    setImages(productInfo[currentStyle].photos);
    setCurrentImage(0);
  }, [currentStyle])

  // image expansion --------------------
  const onImageClick = () => {
    console.log('showModel:', showModel);
    setShowModel(!showModel);
  }

  return (
    <>
      <ImagesBar>
        {images.map((slide, index) => (
          <ImageSelections key={index} src={slide.url} onClick={() => showSelectedImage(index)} />
        ))}
      </ImagesBar>
      <Container>
        <ArrowLeft onClick={onLeftClick} />
        <img src={images[currentImage]?.url} style={{width: "80%", objectFit: "contain", maxHeight: "100%"}} />
        {showModel
        ? <ModalBarAndImage id="modal-bar-and-image">
            <div className="modal-bg modal-prod-detail" onClick={onImageClick}>
              <ExpandedLeft onClick={onLeftClick}/>
              <ModalBar id="modal-bar">
                {images.map((slide, index) => (
                  <ModalImageSelections key={index} src={slide.url} onClick={(e) => showSelectedImage(index, e)} />
                  ))}
              </ModalBar>
              <ModalImage src={images[currentImage]?.url} onClick={(e) => e.stopPropagation()}/>
              <ExpandedRight onClick={onRightClick}/>
            </div>
          </ModalBarAndImage>
        : <ExpandIcon onClick={onImageClick}>
        </ExpandIcon>
        }
        <ArrowRight onClick={onRightClick} />
      </Container>
    </>
  );
}

// onClick={(e) => e.stopPropagation()}

// original display -----------------------------
const Container = styled.div`
  border: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 600px;
  min-width: 500px;
`

const ImagesBar = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: center;
  padding: 30px;git 
`;

const ImageSelections = styled.img`
  display: flex;
  margin: 10px 0 10px;
  width: 40px;
  height: 40px;
  aspect-ratio: 1/1;
  object-fit: cover;
  cursor: pointer;
  border-radius: 2px;
  border: 2px solid;
  &: hover {color: #9F2B68};
`;

const ArrowLeft = styled(BiChevronLeftCircle)`
  font-size: 3rem;
  cursor: pointer;
  user-select: none;
  z-index: 10;
  position: relative;
  left: 45px;
  &: hover {color: #9F2B68;};
`;

const ArrowRight = styled(BiChevronRightCircle)`
  font-size: 3rem;
  cursor: pointer;
  user-select: none;
  z-index: 10;
  position: relative;
  right: 70px;
  &: hover {color: #9F2B68;};
`;

// expanded view ---------------------------------
const ExpandIcon = styled(AiOutlineExpand)`
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  position: relative;
  top: -260px;
  right: 27px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  border-radius: 5px;
  &: hover {color: #9F2B68;};
`
const ModalBarAndImage = styled.div`
  display: flex;
`

const ModalImage = styled.img`
  margin: auto;
  display: flex;
  max-height: 70%;
  max-width: 70%;
  z-index: 99;
  cursor: crosshair;
`;

const ModalBar = styled.div`
  display: flex;
  z-index: 100;
  flex-direction: row;
  align-content: space-between;
  justify-content: center;
  position: absolute;
  top: 80px;
`

const ModalImageSelections = styled.img`
  display: flex;
  margin: 0 10px 0;
  aspect-ratio: 1/1;
  object-fit: cover;
  height: 70px;
  width: 70px;
  cursor: pointer;
`;

const ExpandedLeft = styled(BiChevronLeftCircle)`
  display: flex;
  font-size: 8rem;
  cursor: pointer;
  user-select: none;
  z-index: 110;
  padding: 10px;
  &: hover {color: #9F2B68;};
`;

const ExpandedRight = styled(BiChevronRightCircle)`
  display: flex;
  font-size: 8rem;
  cursor: pointer;
  user-select: none;
  z-index: 110;
  padding: 10px;
  &: hover {color: #9F2B68;};
`;