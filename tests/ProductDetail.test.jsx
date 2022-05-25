// React
import React from 'react';

// Testing
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import App from '../src/components/App';
import ProductInfo from '../src/components/product-detail/product_information/productInfo';
import { onTwitterClick, TwitterShare } from '../src/components/product-detail/product_information/productInfo';
import { GlobalContextProvider } from '../src/context/GlobalStore';
// require ProductInfo from "../src/components/product-detail/product_information/productInfo";

const fakeData = {
  "product_id": "40344",
  "results": [
    {
      "campus": "hr-rfp",
      "category": "Jackets",
      "created_at": "2021-08-13T14:38:44.509Z",
      "default_price": "140.00",
      "description": "The So Fatigues will wake you up and fit you in."
    }
  ]
}

test('product info page renders', async () => {
  render(
  <GlobalContextProvider>
    <ProductInfo />
  </GlobalContextProvider>
  )
  // const value = await screen.getByText('Jackets');
  // expect(value).toBeInTheDocument();
})

test('main app renders', () => {
  render(<App />);
})

// test('should navigate to website when link is clicked', async () => {
//   const { getByTestId } = await render(
//     <GlobalContextProvider>
//       <ProductInfo />
//     </GlobalContextProvider>
//   );
//   expect(getByTestId('Twitter')). toHaveAttribute('href', 'https://twitter.com/intent/tweet');
// });

// test('Should have Read all reviews button', async () => {
//   render(<ProductInfo />)
//   const submitButton = screen.queryByText('Read all');
//   expect(submitButton).toBeInTheDocument();
// });

// test('should open twitter when link is clicked', () => {
//   const componentName = render(
//     <GlobalContextProvider>
//       <ProductInfo />
//     </GlobalContextProvider>
//   );
//   const url1 = getByText("https://twitter.com/intent/tweet");
//   expect(ur1).toBeInTheDocument();
//   screen.userEvent.click(url1);
//   expect(url1).toHaveAttribute('href', 'https://twitter.com/intent/tweet')
//   });

// test('should navigate to twitter when link is clicked', () => {
//   const { getByTestId } = render(<Twitter src="https://img.icons8.com/color/344/twitter--v1.png" onClick={() => onTwitterClick()} />);
//   expect(getByTestId('Twitter')).toHaveAttribute('href', 'https://twitter.com/intent/tweet');
// });

// it('should navigate to website when link is clicked', () => {
//   test('should navigate to twitter', () => {
//     const { getByTestId } = render(
//     <GlobalContextProvider>
//       <ProductInfo />
//     </GlobalContextProvider>
//     );
//     expect(getByTestId('Twitter')). toHaveAttribute('href', 'https://twitter.com/intent/tweet');
//   });
// })

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