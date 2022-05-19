import React from 'react';
import { IdContextProvider } from '../context/GlobalStore';
import RatingsAndReviews from './ratings-reviews/RatingsAndReviews';
import RelatedItems from './related-items/RelatedItems';
import QuestionsAnswers from './questions-answers/QuestionsAnswers';

function App() {
  return (
    <IdContextProvider>
      {/* <ProductDetail /> */}
      <QuestionsAnswers/>
      <RelatedItems />
      <RatingsAndReviews />
    </IdContextProvider>
  );
}

export default App;
