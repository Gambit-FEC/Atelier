import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalStore';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { AiOutlineExpand, AiOutlinePlus } from 'react-icons/ai';
import { set } from 'date-fns';

export default function ImageGallery({productInfo, currentStyle}) {
  const { productId } = useGlobalContext();
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState(productInfo[currentStyle].photos);
  const { length } = images;
  const [showModel, setShowModel] = useState(false);

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

  // image expansion --------------------
  const onImageClick = () => {
    console.log('showModel:', showModel);
    setShowModel(!showModel);
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
        <img src={images[currentImage]?.url} style={{width: "80%", objectFit: "contain", maxHeight: "100%"}} />
        {showModel
        ? <div className="modal-bg" onClick={onImageClick}>
          <ModalImage src={images[currentImage]?.url} onClick={(e) => e.stopPropagation()}/>
          <ModalBar id="modal-bar">
            {images.map((slide, index) => (
              <ModalImageSelections key={index} src={slide.url} onClick={() => showSelectedImage(index)} />
              ))}
          </ModalBar>
        </div>
        : <ExpandIcon onClick={onImageClick}>
          {/* <ExpandedLeft onClick={onLeftClick}/>
          <ExpandedRight onClick={onRightClick}/> */}
        </ExpandIcon>
        }

        <ArrowRight onClick={onRightClick} />
      </Container>
    </>
  );
}

// onClick={(e) => e.stopPropagation()}

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
`;

const ImageSelections = styled.img`
  display: flex;
  margin: 10px 0 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const ArrowLeft = styled(BiChevronLeftCircle)`
  font-size: 3rem;
  cursor: pointer;
  user-select: none;
  z-index: 10;
  position: relative;
  left: 70px;
  &: hover {color: #9F2B68;};
`;

const ArrowRight = styled(BiChevronRightCircle)`
  font-size: 3rem;
  cursor: pointer;
  user-select: none;
  z-index: 10;
  position: relative;
  right: 96px;
  &: hover {color: #9F2B68;};
`;

// expanded view ---------------------------------
const ExpandIcon = styled(AiOutlineExpand)`
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  position: relative;
  top: -215px;
  right: 54px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  border-radius: 5px;
  &: hover {color: #9F2B68;};
`

const hoverPhoto = "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/344/external-plus-user-interface-tanah-basah-glyph-tanah-basah-2.png";
const ModalImage = styled.img`
  margin: auto;
  position: fixed;
  display: block;
  max-height: 70%;
  max-width: 70%;
  z-index: 99;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  cursor: url(${hoverPhoto}), auto;
`;

const ModalBar = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-content: center;
  position: absolute;
  bottom: 240px;
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


// const HoverExpand = styled(AiOutlinePlus)`
//   cursor: AiOutlinePlus;
// `

// const ExpandedLeft = styled(BiChevronLeftCircle)`
//   font-size: 3rem;
//   cursor: pointer;
//   user-select: none;
//   z-index: 10;
//   position: relative;
//   left: 70px;
//   &: hover {color: #9F2B68;};
// `;

// const ExpandedRight = styled(BiChevronRightCircle)`
//   font-size: 10rem;
//   cursor: pointer;
//   user-select: none;
//   z-index: 10;
//   position: relative;
//   right: 96px;
//   &: hover {color: #9F2B68;};
// `;