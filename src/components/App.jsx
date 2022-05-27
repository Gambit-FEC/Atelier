import React from 'react';
import { GlobalContextProvider } from '../context/GlobalStore';
import { RAndRContextProvider } from '../context/RAndRContext';
import ProductDetail from './product-detail/productDetail';
import RelatedItems from './related-items/RelatedItems';
import RatingsAndReviews from './ratings-reviews/RatingsAndReviews';

function App() {
  return (
    <GlobalContextProvider>
      <ProductDetail />
      {/* <QuestionsAndAnswers /> */}
      {/* <RelatedItems /> */}
      {/* <RAndRContextProvider>
        <RatingsAndReviews />
      </RAndRContextProvider> */}
    </GlobalContextProvider>
  );
}

export default App;
