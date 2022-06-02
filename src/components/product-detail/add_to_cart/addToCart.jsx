// import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SelectSize from './sizes';
import SelectQuantity from './quantities';
import AddButton from './addButton';
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
  // console.log('allStyles', allStyles);

  const [styleID, setStyleID] = useState(productInfo[currentStyle].style_id);
  const [sizes, setSizes] = useState(allStyles[0]);
  const [quantities, setQuantities] = useState(allStyles[1]);
  const [skuList, setSkuList] = useState(allStyles[2]);
  // const [skuIndex, setskuIndex] = useState(0);
  // const [skuID, setSkuID] = useState(0);

  useEffect(() => {
    allStyles;
  }, [currentStyle, productInfo]);

  // selecting styles -----------------------
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [quantMax, setQuantMax] = useState([]);
  const [selectedSku, setSelectedSku] = useState(0);

  // // add to cart button --------------------
  // const skuID = {
  //   sku_id: skuList[skuIndex],
  // };

  // const onAddtoCart = () => {
  //   console.log('i am clicked?');
  //   axios.post('/cart', skuID)
  //     .then((result) => {
  //       console.log('axios post works?', result);
  //     })
  //     .catch((err) => { console.log('add to cart button did not send correctly', err); });
  // };

  // selecting size ------------------------
  const onSelectSize = (e) => {
    const index = e.target.selectedIndex - 1;

    let quantArray = [];
    if (quantities[index] > 15) {
      quantArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      setQuantMax(quantArray);
      setSelectedSize(e.target.value);
    } else {
      for (let i = 1; i <= quantities[e.target.selectedIndex - 1]; i += 1) {
        quantArray.push(i);
      }
      setQuantMax(quantArray);
      setSelectedSize(e.target.value);
    }
  };

  return (
    <>
      <Selectors>
        <SelectSize id="select" sizes={sizes} onChange={onSelectSize} />
        <SelectQuantity quantities={quantMax} selectedSize={selectedSize} />
      </Selectors>
      <Cart>
        <AddButton size={selectedSize} quantity={selectedQuantity} />
      </Cart>
    </>
  );
}

const Selectors = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 0.5em;
  max-width: 350px;
  justify-content: space-around;
`;

const Cart = styled.div`
  padding: 0.5em;
  margin: 8px;
  align-items: flex-end;
`;
