import React from 'react';
import { IdContextProvider } from '../context/GlobalStore';
import RatingsAndReviews from './ratings-reviews/RatingsAndReviews';

function App() {
  return (
    <IdContextProvider>
      {/* <ProductDetail />
      <RelatedItems />
      <QuestionsAndAnswers /> */}
      <RatingsAndReviews />
    </IdContextProvider>
  );
}

export default App;
