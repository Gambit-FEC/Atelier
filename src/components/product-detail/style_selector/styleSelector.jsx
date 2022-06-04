import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BsCheck2Circle } from 'react-icons/bs';

import { useGlobalContext } from '../../../context/GlobalStore';

export default function StyleSelector({ productInfo, currentStyle, setCurrentStyle }) {
  const { productId } = useGlobalContext();
  const [currentThumbnail, setCurrentThumbnail] = useState(0);

  function onStyleClick(index) {
    setCurrentStyle(index);
    setCurrentThumbnail(index);
  };

  return (
    <>
      {productInfo.length && (
      <Wrapper>
        <ProductStyle>
          Style > {productInfo[currentStyle] ? productInfo[currentStyle].name : null}
        </ProductStyle>
        <AllThumbnails>
          {productInfo.map((item, index) => (
            (currentThumbnail === index)
            ? (<SelectedThumbnail key={item.style_id} className="selected-thumbnail">
                <Thumbnails key={index} alt={item.style_id} src={
                  item.photos[0].thumbnail_url
                  ? item.photos[0].thumbnail_url
                  : 'https://img.icons8.com/stickers/344/gambit.png'}
                    onClick={() => onStyleClick(index)}
                  />
                  <Checkmark id="checkmark"/>
                </SelectedThumbnail>)
            : <Thumbnails key={index} alt={item.style_id} src={
              item.photos[0].thumbnail_url
              ? item.photos[0].thumbnail_url
              : 'https://img.icons8.com/stickers/344/gambit.png'}
                onClick={() => onStyleClick(index)}
              />
          ))}
        </AllThumbnails>
      </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  padding: 1em;
  align-items: flex-end;
`;

const AllThumbnails = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  max-width: 350px;
  &:focus {
    outline: none;
    border-color: #9F2B68;
  }
`;

const ProductStyle = styled.h2`
  text-transform: uppercase;
`;

const SelectedThumbnail = styled.div`
  border-radius: 50%;
  position: relative;
  object-fit: cover;
  &: hover {color: #9F2B68;};
`;

const Thumbnails = styled.img`
  border-radius: 50%;
  position: relative;
  width: 60px;
  height: 60px;
  object-fit: cover;
  border: 2px solid;
  margin: 10px;
  &: hover {
    color: #9F2B68;
    box-shadow: #9F2B68 0px 0px 10px
  };
  cursor: pointer;
`;

const Checkmark = styled(BsCheck2Circle)`
  z-index: 10;
  font-size: 3rem;
  color: #9F2B68;
  font-weight: bold;
  position: absolute;
  transform: translate(-34px, 0px);
`;

