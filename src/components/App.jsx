import React from 'react';
import { GlobalContextProvider } from '../context/GlobalStore';
import { RAndRContextProvider } from '../context/RAndRContext';
import ProductDetail from './product-detail/productDetail';
import RelatedItems from './related-items/RelatedItems';
import RatingsAndReviews from './ratings-reviews/RatingsAndReviews';

function App() {
  return (
    <>
      <div className="page-top-bar">
        <div className="page-title">Gambit Outlet</div>
        <div className="nav-bar">
          <a className="underline-button nav-bar-item" href="#productDetail">Product Overview</a>
          <a className="underline-button nav-bar-item" href="#related-products-module">Related Products & Outfit</a>
          <a className="underline-button nav-bar-item" href="#ratings-and-reviews">Ratings and Reviews</a>
        </div>
      </div>
      <GlobalContextProvider>
        <ProductDetail />
        {/* <QuestionsAndAnswers /> */}
        <RelatedItems />
        <RAndRContextProvider>
          <RatingsAndReviews />
        </RAndRContextProvider>
      </GlobalContextProvider>
    </>
  );
}

export default App;
