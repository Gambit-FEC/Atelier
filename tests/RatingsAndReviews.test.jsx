import React from 'react';
import { createRoot } from 'react-dom/client';
import '@testing-library/jest-dom';
import OverallRating from '../src/components/ratings-reviews/ratings/OverallRating';
import { GlobalContextProvider } from '../src/context/GlobalStore';
import { RAndRContextProvider } from '../src/context/RAndRContext';

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);

describe('Ratings and Reviews widget', () => {
  test('widget should render on screen', () => {
    root.render(
      <GlobalContextProvider>
        <RAndRContextProvider>
          <OverallRating />
        </RAndRContextProvider>
      </GlobalContextProvider>,
    );
  });
});
