import React from 'react';
import { useId, updateId } from '../../context/GlobalStore';
import RelatedList from './related/relatedList';
import OutfitList from './outfit/outfitList';

export default function RelatedItems() {
  const productId = useId();
  const updateProductId = updateId();

  return (
    <>
      <h1>RELATED ITEMS MODULE ITEM ID: {productId}</h1>
      <button type="button" onClick={() => updateProductId(productId + 1)}>Increment</button>
      <RelatedList />
      <OutfitList />
    </>
  );
}
