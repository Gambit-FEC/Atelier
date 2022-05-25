import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function StyleSelector() {
  const { productId } = useGlobalContext();
  const [productInfo, setProductInfo] = useState([]);

  // Grab item data from server----------------------
  useEffect(() => {
    console.log('useEffect working?');
    axios.get(`/products/${productId}`)
      .then((result) => {
        console.log('does getProduct work???', result.data);
        setProductInfo(result.data);
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
      <h2>style selector test</h2>
      <div>wow style selectors</div>
      <p>hello styleselector</p>
    </>
  );
}
