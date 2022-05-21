import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RelatedCard from './relatedCard';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function relatedList() {
  const { productId } = useGlobalContext();
  let allProductInfo = [];
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedInfo, setRelatedInfo] = useState([]);

  function getRelatedProducts() {
    // console.log(productId);
    axios.get('/related/productList', { params: { ID: productId } }).then((result) => {
      // console.log(result.data);
      setRelatedProducts(result.data);
      return result.data;
    }).then((relatedIDs) => {
      // console.log(relatedIDs);
      relatedIDs.forEach((elementID) => {
        // console.log(elementID);
        axios.get('/related/productInfo', { params: { ID: elementID } }).then((result) => {
          console.log(result.data);
          allProductInfo.push(result);
        });
      });
    });
  }

  useEffect(() => {
    if (relatedProducts.length === 0) {
      getRelatedProducts();
    }
  });

  return (
    <div className="related-items-list">
      <h3>Related Products</h3>
      {/* {
        allProductInfo.map((info) => (
          <RelatedCard info={info} key={info.id} />
        ))
      } */}
    </div>
  );
}
