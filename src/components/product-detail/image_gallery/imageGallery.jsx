import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalStore';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { set } from 'date-fns';

export default function ImageGallery({productInfo, currentStyle}) {
  const { productId } = useGlobalContext();
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState(productInfo[currentStyle].photos);
  const { length } = images;

  // console.log('images', images);

  // onClick functionalities for slides -------------
  const onLeftClick = () => {
    console.log('left');
    setCurrentImage(currentImage === 0 ? length - 1 : currentImage - 1);
  };

  const onRightClick = () => {
    console.log('right');
    setCurrentImage(currentImage === length - 1 ? 0 : currentImage + 1);
  };

  // image carousel menu sidebar --------------------
  const onStyleImageClick = (event) => {
  }

  const showSelectedImage = (image) => {
    setCurrentImage(image);
  }

  useEffect(() => {
    setImages(productInfo[currentStyle].photos);
    setCurrentImage(0);
  }, [currentStyle])

  return (
    <>
      <ImagesBar>
        {images.map((slide, index) => (
          <ImageSelections key={index} src={slide.url} onClick={() => showSelectedImage(index)} />
        ))}
      </ImagesBar>
      <Container>
        <ArrowLeft onClick={onLeftClick} />
        <img src={images[currentImage]?.url} style={{width: "80%", objectFit: "contain", maxHeight: "100%"}}/>
        <ArrowRight onClick={onRightClick} />
      </Container>
    </>
  );
}

const Container = styled.div`
  border: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 500px;
  min-width: 500px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Image = styled.div`
  display: flex;
  width: 50px;
`;

const ImagesBar = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: center;
`

const ImageSelections = styled.img`
  display: flex;
  margin: 10px 0 10px;
  width: 30px;
  height: 30px;

`

const ArrowLeft = styled(BiChevronLeftCircle)`
  font-size: 3rem;
  cursor: pointer;
  user-select: none;
  z-index: 10;
  position: relative;
  left: 70px;
`;

const ArrowRight = styled(BiChevronRightCircle)`
  font-size: 3rem;
  cursor: pointer;
  user-select: none;
  z-index: 10;
  position: relative;
  right: 70px;
`;