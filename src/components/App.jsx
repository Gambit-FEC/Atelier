import React from 'react';
import { GlobalContextProvider } from '../context/GlobalStore';
import RatingsAndReviews from './ratings-reviews/RatingsAndReviews';
import RelatedItems from './related-items/RelatedItems';
import QuestionsAnswers from './questions-answers/QuestionsAnswers';
import ProductDetail from './product-detail/productDetail';

function App() {
  return (
<<<<<<< HEAD
    <IdContextProvider>
      <QuestionsAnswers/>
      <ProductDetail />
      <RelatedItems />
    </IdContextProvider>
=======
    <GlobalContextProvider>
      {/* <ProductDetail /> */}
      {/* <QuestionsAndAnswers /> */}
      <RelatedItems />
      <RatingsAndReviews />
    </GlobalContextProvider>
>>>>>>> master
  );
}

export default App;
