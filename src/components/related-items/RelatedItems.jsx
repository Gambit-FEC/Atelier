import React from 'react';
import { useId } from '../../context/GlobalStore';
import RelatedList from './related/relatedList';
import OutfitList from  './outfit/outfitList';

export default function RelatedItems() {
  const [productId, setProductId] = useId();
  return (
    <>
      <h1>RELATED ITEMS MODULE ITEM ID: {productId}</h1>
      <RelatedList/>
      <OutfitList/>
    </>
  );
}
