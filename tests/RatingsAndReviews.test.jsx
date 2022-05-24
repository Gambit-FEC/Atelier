import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/components/App';

describe('Ratings and Reviews widget', () => {
  test('widget should render on screen', async () => {
    const { container, getByText } = await render(<App />);
    await expect(getByText('prodDetail')).toBeInTheDocument();
    console.log('DONE');
  });
});
