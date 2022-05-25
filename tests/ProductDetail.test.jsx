import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductInfo from '../src/components/product-detail/product_information/productInfo';
import { onTwitterClick, TwitterShare } from '../src/components/product-detail/product_information/productInfo';
// require ProductInfo from "../src/components/product-detail/product_information/productInfo";


// test('should open twitter when link is clicked', () => {
//   const componentName = render(<TwitterShare src="/logoPhotos/twitter.png" onClick={() => onTwitterClick()} />)
//   const url1 = getByText("https://twitter.com/intent/tweet");
//   expect(ur1).toBeInTheDocument();
//   screen.userEvent.click(url1);
//   expect(url1).toHaveAttribute('href', 'https://twitter.com/intent/tweet')
//   });

test('should navigate to twitter when link is clicked', () => {
  const { getByTestId } = render(<Twitter src="logoPhotos/twitter.png" onClick={() => onTwitterClick()} />);
  expect(getByTestId('Twitter')).toHaveAttribute('href', 'https://twitter.com/intent/tweet');

});

// test('should navigate to reviews when link is clicked', () => {
//   const { getByText } = render( <a href="#ratings-and-reviews" id="see-reviews">Read all {' '} {allReviews || 'no ratings'} {' '} reviews</a>);

//   const link = getByText('Read all');

//   fireEvent.click(link);

//   expect(window.location.href).toBe("#ratings-and-reviews");
//   expect(screen.getByText('Click Me').closest('a')).toHaveAttribute('href', '#ratings-and-reviews')
// });

// // test
// test('two plus two is four', () => {
//   expect(2 + 2).toBe(4);
// });