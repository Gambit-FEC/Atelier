import React from 'react';

export default function NavBar() {
  return (
    <div className="page-top-bar">
      {/* <div className="page-title">
        <span className="page-title-g">Gambit</span>
        <span className="page-title-o">Outlet</span>
      </div> */}
      <div className="page-title-border" />
      <div className="page-title-short">
        <span className="page-title-short-g">G</span>
        <span className="page-title-short-o">o</span>
        <span className="page-title-short-spade">♠</span>
      </div>
      <div className="nav-bar">
        <a className="underline-button nav-bar-item" href="#product-detail">Product Overview</a>
        <a className="underline-button nav-bar-item" href="#related-items">Related Products & Outfit</a>
        <a className="underline-button nav-bar-item" href="#ratings-and-reviews">Ratings and Reviews</a>
      </div>
    </div>
  );
}
