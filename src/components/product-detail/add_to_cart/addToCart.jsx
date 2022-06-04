import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SelectSize from './sizes';
import SelectQuantity from './quantities';
import AddButton from './addButton';
import { useGlobalContext } from '../../../context/GlobalStore';

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

  const [sizes, setSizes] = useState(allStyles[0]);
  const [quantities, setQuantities] = useState(allStyles[1]);

  useEffect(() => {
    AllStyles(productInfo[currentStyle].skus);
    setSelectedSize('');
    setSelectedQuantity(0);
    setSizes(allStyles[0]);
    setQuantities(allStyles[1]);
  }, [currentStyle, productInfo, productId]);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [quantMax, setQuantMax] = useState([]);

  function onSelectSize(e) {
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
  }

  const onSelectQuantity = (e) => { setSelectedQuantity(e); };

  return (
    <>
      <Selectors>
        <SelectSize id="select" sizes={sizes} selectedSize={selectedSize} onChange={onSelectSize} />
        <SelectQuantity quantities={quantMax} selectedSize={selectedSize} onChange={onSelectQuantity} />
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
  margin: 7px 0px 0px;
`;

const Cart = styled.div`
  padding: 0.5em;
  margin: 8px;
  align-items: flex-end;
  margin: -2px 7px 0px;
`;
