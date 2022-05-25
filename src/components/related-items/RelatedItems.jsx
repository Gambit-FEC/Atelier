import React from 'react';
import { useGlobalContext } from '../../context/GlobalStore';
import RelatedList from './related/relatedList';
import OutfitList from './outfit/outfitList';

export default function RelatedItems() {
  const { productId } = useGlobalContext();
  const { setProductId } = useGlobalContext();

  return (
    <div id="related-products-module">
      <RelatedList />
      <OutfitList />
    </div>
  );
}
