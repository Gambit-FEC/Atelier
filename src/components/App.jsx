import React from 'react';
import { IdContextProvider } from '../context/GlobalStore';
import RatingsAndReviews from './ratings-reviews/RatingsAndReviews';
import RelatedItems from './related-items/RelatedItems';

function App() {
  return (
    <IdContextProvider>
      {/* <ProductDetail />
      <QuestionsAndAnswers /> */}
      <RelatedItems />
      <RatingsAndReviews />
    </IdContextProvider>
  );
}

export default App;
