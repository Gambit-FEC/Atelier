import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import SelectSize from './sizes';
import SelectQuantity from './quantities';
import { useGlobalContext } from '../../../context/GlobalStore';

// create arrays for styles --------------
function AllStyles(styles) {
  const sizes = [];
  const quantities = [];
  const skuList = [];
  const quantAndSize = Object.values(styles);
  const sizeID = Object.keys(styles);

  for (let i = 0; i < quantAndSize.length; i++) {
    sizes.push(quantAndSize[i].size);
    quantities.push(quantAndSize[i].quantity);
    skuList.push(sizeID[i]);
  }
  return [sizes, quantities, skuList];
}

export default function AddToCart({ productInfo, currentStyle }) {
  const { productId } = useGlobalContext();
  const allStyles = AllStyles(productInfo[currentStyle].skus);
  console.log('allStyles', allStyles);

  const [styleID, setStyleID] = useState(productInfo[currentStyle].style_id);
  const [sizes, setSizes] = useState(allStyles[0]);
  const [quantities, setQuantities] = useState(allStyles[1]);
  const [skuList, setSkuList] = useState(allStyles[2]);
  const [skuIndex, setskuIndex] = useState(0);
  // const [skuID, setSkuID] = useState(0);


  console.log('add me to cart hohoho', productInfo);
  console.log('add me to cart hohoho with style', productInfo[currentStyle].skus);

  // add to cart button --------------------
  const skuID = {
    sku_id: skuList[skuIndex]
  }
  const onAddtoCart = (event) => {
    console.log('i am clicked?', event)
    axios.post('/cart', skuID)
      .then((result) => {
        console.log('axios post works?', result);
      })
      .catch((err) => { console.log('add to cart button did not send correctly', err); });
  };

  return (
    <Wrapper>
      <SelectSize sizes={sizes} />
      <SelectQuantity quantities={quantities} />
      <button onClick={onAddtoCart}>Add to Cart</button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 4em;
  align-items: flex-end;
`;