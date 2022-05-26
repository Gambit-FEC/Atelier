import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// import Thumbnail from './thumbnails';
import { useGlobalContext } from '../../../context/GlobalStore';


export default function StyleSelector() {
  const { productId } = useGlobalContext();
  const [productInfo, setProductInfo] = useState([]);

  // Grab item data from server----------------------
  useEffect(() => {
    // console.log('useEffect working?');
    axios.get(`/products/${productId}`)
      .then((result) => {
        console.log('item styles!!', result.data[1].results);
        console.log('data:', result.data);
        setProductInfo(result.data[1].results);
      })
      .catch((err) => { console.log('getproduct in addtocart didnt work', err); });
  }, [productId]);




  return (
    <>
      <h1>
        style selector?
        {' '}
        {productId}
      </h1>
      <h4>style name</h4>
      <AllThumbnails>
        {productInfo.map((item) => {
          console.log('map?', item.photos[0].thumbnail_url);
          return (
            // <Thumbnails src={item.photos[index].thumbnail_url} />
            <Thumbnails src={item.photos[0].thumbnail_url ? item.photos[0].thumbnail_url : 'https://img.icons8.com/stickers/344/gambit.png'} />
          );
        })}
      </AllThumbnails>

      <div>wow style selectors</div>
      <p>hello styleselector</p>
    </>
  );
}

const AllThumbnails = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`
// const AllThumbnails = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
//   align-content: space-around;
// `
// grid-template-columns: 25% 25% 25% 25%;

const Thumbnails = styled.img`
  display: flex;
  clip-path: circle();
  width: 25%;
  height: 25px;
  box-sizing: border-box;
  display: grid | inline-grid;
`