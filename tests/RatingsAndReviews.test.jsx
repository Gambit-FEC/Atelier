import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import OverallRating from '../src/components/ratings-reviews/ratings/OverallRating';
import { GlobalContextProvider } from '../src/context/GlobalStore';
import { RAndRContextProvider } from '../src/context/RAndRContext';

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container)

const value = {
  reviewsMeta: {
    averageRating: 3.5,
    characteristics: {
      Comfort: { id: 135242, value: '3.6071428571428571' },
      Quality: { id: 135243, value: '3.4444444444444444' },
      Size: { id: 135240, value: '2.7500000000000000' },
      Width: { id: 135241, value: '3.1428571428571429' },
    },
    product_id: "40350",
    ratings: { 1: '4', 2: '4', 3: '5', 4: '5', 5: '11' },
    recommended: { false: '8', true: '21' },
    totalRatings: 29,
  },
};

describe('Ratings and Reviews widget', () => {
  test('widget should render on screen', () => {
    act(() => {
      root.render(
        <GlobalContextProvider>
          <RAndRContextProvider>
            <OverallRating />
          </RAndRContextProvider>
        </GlobalContextProvider>,
      );
    });
  });
});

          // const { container, getByText } = await render(<OverallRating />);
          // await expect(getByText('★★★★★')).toBeInTheDocument();
          // console.log('DONE');