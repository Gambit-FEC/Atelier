import React from 'react';
import { IdContextProvider } from '../context/GlobalStore';
// import RatingsAndReviews from './ratings-reviews/RatingsAndReviews';
import RelatedItems from './related-items/RelatedItems';
<<<<<<< HEAD
import QuestionsAnswers from './questions-answers/QuestionsAnswers';
=======
import ProductDetail from './product-detail/productDetail';
>>>>>>> master

function App() {
  return (
    <IdContextProvider>
<<<<<<< HEAD
      {/* <ProductDetail /> */}
      <QuestionsAnswers/>
=======
      <ProductDetail />
      {/* <QuestionsAndAnswers /> */}
>>>>>>> master
      <RelatedItems />
      {/* <RatingsAndReviews /> */}
    </IdContextProvider>
  );
}

export default App;
