import React from 'react';
import { GlobalContextProvider } from '../context/GlobalStore';
import RatingsAndReviews from './ratings-reviews/RatingsAndReviews';
import RelatedItems from './related-items/RelatedItems';
import ProductDetail from './product-detail/productDetail';

function App() {
  return (
    <GlobalContextProvider>
      <ProductDetail />
      {/* <QuestionsAndAnswers /> */}
      {/* <RelatedItems /> */}
      {/* <RatingsAndReviews /> */}
    </GlobalContextProvider>
  );
}

export default App;
