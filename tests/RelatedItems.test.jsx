import React from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalContextProvider } from '../src/context/GlobalStore';
import '@testing-library/jest-dom';
import RelatedCard from '../src/components/related-items/related/relatedCard';

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);

const value = [{
  product: {
    category: 'Accessories',
    id: 40325,
    name: 'Bright Future Sunglasses',
    price: '69.00',
  },
  rating: {
    averageRating: 3.5,
  },
  style: {
    thumbnail_url: null,
    url: null,
  },
  favorite: false,
}, {
  product: {
    category: 'Accessories',
    id: 40325,
    name: 'Bright Future Sunglasses',
    price: '69.00',
  },
  rating: {
    averageRating: 3.5,
  },
  style: {
    thumbnail_url: null,
    url: null,
  },
  favorite: false,
},
];

describe('Related Card component', () => {
  test('related card should render', () => {
      root.render(
        <GlobalContextProvider>
          <RelatedCard value={value} />
        </GlobalContextProvider>,
    );
  });
});