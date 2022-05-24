import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RelatedCard from './relatedCard';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function relatedList() {
  const { productId } = useGlobalContext();
  const allProductList = [];
  const [relatedInfo, setRelatedInfo] = useState([]);

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
    axios.get(`/related/productList/${productId}`).then((productIdsResponse) => {
      // console.log(productIdsResponse);
      const listOfIds = productIdsResponse.data;
      listOfIds.forEach((id) => {
        // console.log('IDs: ', id);
        const promise = Promise.all([getRelatedInfo(id),
          getRelatedStyle(id), getRelatedRating(id)]);
        listOfPromises.push(promise);
      });

      Promise.all(listOfPromises).then((promiseResults) => {
        promiseResults.forEach((element) => {
          const product = {};
          product.product = element[0].data;
          product.style = element[1].data;
          product.rating = element[2].data;
          allProductList.push(product);
        });
        setRelatedInfo(allProductList);
      });
    });
  }

  useEffect(() => {
    getRelatedProducts();
  }, []);

  return (
    <div className="related-items-list">
      <h3>Related Products</h3>
      {
        relatedInfo.map((info, index) => (
          <RelatedCard info={info} key={index} />
        ))
      }
    </div>
  );
}
