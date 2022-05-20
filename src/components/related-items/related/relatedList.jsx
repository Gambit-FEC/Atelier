import React, { useEffect } from 'react';
import axios from 'axios';
import RelatedCard from './relatedCard';
import { useId, updateId } from '../../../context/GlobalStore';

export default function relatedList() {
  const productId = useId();

  function getRelatedProducts() {
    console.log(productId);
    axios.get('/products/related', { params: { ID: productId } }).then(() => {
      console.log('Success response');
    });
  }

  useEffect(() => {
    getRelatedProducts();
  });

  return (
    <div className="related-items-list">
      <h3>Related Products</h3>
      <RelatedCard />
    </div>
  );
}
