import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { OutfitCard, EmptyCard } from './outfitCard';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function outfitList() {
  let outfitList = [];
  const { productId } = useGlobalContext();
  const [outfitInfo, setOutfitInfo] = useState([]);
  const [ cardList, setCardList ] = useState(false);

  function addCard(e) {
    console.log(!cardList);
    setCardList(!cardList);
  }

  function getRelatedInfo(id) {
    return axios.get(`/related/productInfo/${id}`);
  }

  function getRelatedStyle(id) {
    return axios.get(`/related/productStyle/${id}`);
  }

  function getRelatedRating(id) {
    return axios.get(`/reviews/meta/${id}`);
  }

  function getRelatedProducts() {
    const listOfPromises = [];

    const promise = Promise.all([getRelatedInfo(productId),
    getRelatedStyle(productId), getRelatedRating(productId)]);
    listOfPromises.push(promise);

    Promise.all(listOfPromises).then((promiseResults) => {
      promiseResults.forEach((element) => {
        const product = {};
        product.product = element[0].data;
        product.style = element[1].data;
        product.rating = element[2].data;
        outfitList.push(product);
      });
      // console.log(allProductList);
      setOutfitInfo(outfitList);
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getRelatedProducts();
  }, []);

  return (
    <div className="outfit-items-list">
      <h2>YOUR OUTFIT</h2>
      {
        cardList ?  <OutfitCard data={outfitInfo} /> : <EmptyCard addCard={addCard}/>
      }
    </div>
  );
}

