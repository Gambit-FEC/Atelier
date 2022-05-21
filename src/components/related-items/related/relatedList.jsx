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
      relatedIDs.map((id) => (
        allProductInfo.push(axios.get('/related/productInfo', { params: { ID: id } }))
      ));
      // console.log('ALL PRODUCT INFO: ', allProductInfo);
      const allPromise = Promise.all(allProductInfo);
      allPromise.then((values) => {
        // console.log('VALUES FROM PROMISE ALL: ', values);
        setRelatedInfo(values);
      }).catch((error) => {
        console.log(error);
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
      {
        relatedInfo.map((info) => (
          <RelatedCard info={info.data} key={info.data.id} />
        ))
      }
    </div>
  );
}
