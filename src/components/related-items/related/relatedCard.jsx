import React from 'react';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function relatedCard(info) {
  console.log('INFO: ', info.info);
  const placeholder = 'http://placecorgi.com/260/180';

  // const { productInfo } = useGlobalContext();
  return (
    <div className="related-items-card">
      <img
        src={info.info.style.url === null ? placeholder : info.info.style.thumbnail_url}
        alt="product-img"
      />
      <p className="card-category">
        { info.info.product.category }
      </p>
      <p className="card-name">
        { info.info.product.name }
      </p>
      <p className="card-cost">
        { info.info.product.price }
      </p>
      <p className="card-rating">
        { info.info.rating.averageRating }
      </p>
    </div>
  );
}
