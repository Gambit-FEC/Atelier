import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RelatedCard from './relatedCard';
import { useId, updateId } from '../../../context/GlobalStore';

export default function relatedList() {
  let allProductInfo = [];
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedInfo, setRelatedInfo] = useState([]);
  const productId = useId();

  function getRelatedProducts() {
    // console.log(productId);
    axios.get('/related/productList', { params: { ID: productId } }).then((result) => {
      // console.log(result.data);
      setRelatedProducts(result.data);
      return result.data;
    }).then((relatedIDs) => {
      // console.log(relatedIDs);
      relatedIDs.forEach((element) => {
        console.log(element);
        axios.get('/related/productInfo', { params: { ID: element } }).then((result) => {
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
