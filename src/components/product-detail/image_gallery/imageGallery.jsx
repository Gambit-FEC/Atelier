import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalStore';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { set } from 'date-fns';


export default function ImageGallery() {
  const { productId } = useGlobalContext();
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const { length } = images;

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

  // image carousel menu sidebar --------------------
  const onStyleImageClick = (event) => {
  }

  const showSelectedImage = (index) => {
    // eslint-disable-next-line no-lone-blocks
    console.log('need functionality to change style!! :C');
    // {
    //   images[index].map((slide, i) => (
    //     <Image>
    //       {i === currentImage && (
    //         <Wrapper>
    //           <img src={slide.url} width={10 * (length + 1)} alt="style-photo" />
    //         </Wrapper>
    //       )}
    //     </Image>
    //   ));
    // }
  };

  // const showSelectedImage = (index) => {
  //   {images.map((slide, index) => (
  //     <Image className={index === currentImage ? 'slide active' : 'slide inactive'} key={index}>
  //       {index === currentImage && (
  //         <Wrapper>
  //           <img src={slide.url} width={10 * (length + 1)} alt="style-photo" />
  //         </Wrapper>
  //       )}
  //     </Image>
  //   ))}
  // };

  return (
    <>
      {/* <img src="http://placecorgi.com/260/180" /> */}
      <ImagesBar>
        {images.map((slide, index) => (
          <ImageSelections key={index} src={slide.url} onClick={() => showSelectedImage()} />
        ))}
      </ImagesBar>
      <Container>
        <ArrowLeft onClick={onLeftClick} />
        {/* {showSelectedImage(0)} */}
        {/* {images.map((slide, index) => (
          <Image className={index === currentImage ? 'slide active' : 'slide inactive'} key={index}>
            {index === currentImage && (
              <Wrapper>
                <img src={slide.url} width={10 * (length + 1)} alt="style-photo" />
              </Wrapper>
            )}
          </Image>
        ))} */}
        <ArrowRight onClick={onRightClick} />
      </Container>
    </>
  );
}

const Container = styled.section`
  border: white;
  display: flex;
  flex-direction: row;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
// width: ${({ width }) => width + 'px'}

const Image = styled.section`
  display: flex;
  width: 50px;
`;

const ImagesBar = styled.section`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`

const ImageSelections = styled.img`
  display: flex;
  margin: 10px 0 10px;
  width: 30px;
  height: 30px;

`

const ArrowLeft = styled(FaArrowLeft)`
  font-size: 3rem;
  cursor: pointer;
  user-select: none;
  color: green;
`;

const ArrowRight = styled(FaArrowRight)`
  font-size: 3rem;
  cursor: pointer;
  user-select: none;
  color: green;
`;