import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RelatedCard from './relatedCard';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function relatedList() {
  const { productId } = useGlobalContext();
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
    const allProductList = [];
    axios.get(`/related/productList/${productId}`).then((productIdsResponse) => {
      const listOfIds = productIdsResponse.data;
      listOfIds.forEach((id) => {
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
          product.favorite = false;
          allProductList.push(product);
        });
        setRelatedInfo(allProductList);
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  useEffect(() => {
    getRelatedProducts();
  }, []);

  return (
    <Container className="related-items-list">
      <h2>You may also like...</h2>
      <RelatedCard data={relatedInfo} />
    </Container>
  );
}

const Container = styled.div`
display: flex;
flex-direction: column;
`;
