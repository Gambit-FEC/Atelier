import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalStore';
import { FaArrowRight, FaArrowLeft } from 'react-icons/Fa';
import { set } from 'date-fns';


export default function ImageGallery() {
  const { productId } = useGlobalContext();
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const {length} = images;

  // onClick functionalities for slides -------------
  const onLeftClick = () => {
    console.log('left');
    setCurrentImage(currentImage === 0 ? length - 1 : currentImage - 1);
  };

  const onRightClick = () => {
    console.log('right');
    setCurrentImage(currentImage === length - 1 ? 0 : currentImage + 1);
  };

  // // Carousel ---------------------------------------
  // if (!Array.isArray(images) || images.length <= 0) {
  //   console.log('no images? or carousel didnt get any images');
  //   return null;
  // }
  console.log('currentImage??', currentImage);


  // Grab item data from server----------------------
  useEffect(() => {
    // console.log('useEffect working?');
    axios.get(`/products/${productId}`)
      .then((result) => {
        console.log('item photos!!', result.data[1].results[0].photos);
        console.log('one photo', result.data[1].results[0].photos[0].url);
        // console.log('item data:', result.data);
        setImages(result.data[1].results[0].photos);
      })
      .catch((err) => { console.log('getproduct in imageGallery didnt work', err); });
  }, [productId]);

  return (
    <>
      {/* <img src="http://placecorgi.com/260/180" /> */}
      <Container>
        <ArrowLeft onClick={onLeftClick} />
        <Slides>
          <Image>
            {images.map((slide, index) => (
              <div className={index === currentImage ? 'side active' : 'slide'} key={index}>
                {index === currentImage && (
                  <img src={slide.url} alt="style-photo" />
                )}
              </div>
            ))}
          </Image>
        </Slides>
        <ArrowRight onClick={onRightClick} />
      </Container>
    </>
  );
}

const Container = styled.section`
  display: flex;
  justify-content: flex-end;
  width: 40%;
`

const Slides = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100px;
  border-radius: 10px;
`;

const Image = styled.section`
  display: flex;
  width: 50px;
  height: 60px;
`;

const ArrowLeft = styled(FaArrowLeft)`
  position: absolute;
  top: 50%;
  left: 32px;
  font-size: 3rem;
  z-index: 10;
  cursor: pointer;
  user-select: none;
  color: black;
`;

const ArrowRight = styled(FaArrowRight)`
  position: absolute;
  top: 50%;
  right: 32px;
  font-size: 3rem;
  z-index: 10;
  cursor: pointer;
  user-select: none;
  color: black;
`;