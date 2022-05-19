import React from "react";
import RatingsAndReviews from './ratings-reviews/index.jsx';
import ProductDetail from './product-detail/productDetail.jsx';

function App() {
  // state item id

  return (
    <>
      <ProductDetail />
      <DanikasWidget />
      <AndysWidget />
      <RatingsAndReviews />
    </>
  );
}

export default App;