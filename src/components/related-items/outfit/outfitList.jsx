import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { OutfitCard, EmptyCard } from './outfitCard';
import { useGlobalContext } from '../../../context/GlobalStore';

let outfitArray = [];

export default function outfitList() {
  const { productId } = useGlobalContext();
  const [outfitInfo, setOutfitInfo] = useState([]);
  const [cardList, setCardList] = useState(false);

  function saveToLocalStorage(outfitId) {
    const localStorageItem = localStorage.getItem('outfits');
    if (localStorageItem === null) {
      localStorage.setItem('outfits', JSON.stringify([outfitId]));
    } else {
      const productIDs = JSON.parse(localStorageItem);
      if (productIDs.indexOf(outfitId) < 0) {
        productIDs.push(outfitId);
        localStorage.setItem('outfits', JSON.stringify(productIDs));
      }
    }
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

  function getRelatedProducts(currentProductId) {
    let currentIndex = -1;
    const localStorageItem = JSON.parse(localStorage.getItem('outfits'));
    const index = localStorageItem.indexOf(currentProductId);
    outfitArray.forEach((element) => {
      if (element.product.id === currentProductId) {
        currentIndex = index;
      }
    });
    if (currentIndex < 0) {
      const listOfPromises = [];
      const promise = Promise.all([getRelatedInfo(currentProductId),
        getRelatedStyle(currentProductId), getRelatedRating(currentProductId)]);
      listOfPromises.push(promise);

      Promise.all(listOfPromises).then((promiseResults) => {
        promiseResults.forEach((element) => {
          const product = {};
          product.product = element[0].data;
          product.style = element[1].data;
          product.rating = element[2].data;
          outfitArray.push(product);
        });
        console.log('after :', outfitArray);
        setOutfitInfo([...outfitArray]);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  function removeCard(currentProductId) {
    const localStorageItem = JSON.parse(localStorage.getItem('outfits'));
    if (localStorageItem.length > 0) {
      const currentIndex = localStorageItem
        .findIndex((productID) => productID === currentProductId);
      console.log(currentIndex);
      console.log('length ', localStorageItem.length);
      if (currentIndex === 0 && localStorageItem.length === 1) {
        localStorage.removeItem('outfits');
        outfitArray = [];
        setOutfitInfo([]);
        setCardList(!cardList);
      } else {
        localStorageItem.splice(currentIndex, 1);
        localStorage.setItem('outfits', JSON.stringify(localStorageItem));

        const index = outfitArray.findIndex((p) => p.product.id === currentProductId);
        outfitArray.splice(index, 1);
        setOutfitInfo([...outfitArray]);
      }
    }
  }
  function addCard() {
    setCardList(true);
    if (typeof (Storage) !== 'undefined') {
      saveToLocalStorage(productId);
      getRelatedProducts(productId);
    } else {
      console.log('BROWSER DOES NOT SUPPORT');
    }
  }

  function getSavedProductOutfits() {
    const localStorageItem = localStorage.getItem('outfits');
    if (localStorageItem !== null) {
      const productIDs = JSON.parse(localStorageItem);
      setCardList(!cardList);
      productIDs.forEach((Ids) => {
        getRelatedProducts(Ids);
      });
    }
  }

  useEffect(() => {
    getSavedProductOutfits();
  }, []);

  return (
    <div className="outfit-items-list">
      <h2>YOUR OUTFIT</h2>

      {
        cardList ? <OutfitCard data={outfitInfo} addCard={addCard} removeCard={removeCard}/>
          : <EmptyCard addCard={ addCard }/>
      }
    </div>
  );
}
