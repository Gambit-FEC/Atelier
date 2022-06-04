import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/components/App';
import ProductInfo from '../src/components/product-detail/product_information/productInfo';
import { GlobalContextProvider } from '../src/context/GlobalStore';

test('product info page renders', async () => {
  render(
    <GlobalContextProvider>
      <ProductInfo />
    </GlobalContextProvider>,
  );
});

test('main app renders', () => {
  render(<App />);
});
