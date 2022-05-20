import React from 'react';
import { useGlobalContext } from '../../context/GlobalStore';
import RelatedList from './related/relatedList';
import OutfitList from './outfit/outfitList';

export default function RelatedItems() {
  const { productId } = useGlobalContext();
  const { setProductId } = useGlobalContext();

  return (
    <div className="related-products-module">
      <h1>RELATED ITEMS MODULE ITEM ID: {productId}</h1>
      <button type="button" onClick={() => setProductId(productId + 1)}>Increment</button>
      <RelatedList />
      <OutfitList />
    </div>
  );
}
