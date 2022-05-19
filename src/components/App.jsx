import React from 'react';
import { IdContextProvider } from '../context/GlobalStore';
import RatingsAndReviews from './ratings-reviews/RatingsAndReviews';
import RelatedItems from './related-items/RelatedItems';
import ProductDetail from './product-detail/productDetail';

function App() {
  return (
    <IdContextProvider>
      <ProductDetail />
      <RelatedItems />
      {/* <QuestionsAndAnswers /> */}
      <RatingsAndReviews />
    </IdContextProvider>
  );
}

export default App;
