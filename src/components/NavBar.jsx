import React from 'react';

export default function NavBar() {
  return (
    <div className="page-top-bar">
      <div className="page-title">Gambit Outlet</div>
      <div className="nav-bar">
        <a className="underline-button nav-bar-item" href="#product-detail">Product Overview</a>
        <a className="underline-button nav-bar-item" href="#related-items">Related Products & Outfit</a>
        <a className="underline-button nav-bar-item" href="#ratings-and-reviews">Ratings and Reviews</a>
      </div>
    </div>
  );
}
