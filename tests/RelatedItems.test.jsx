import React from 'react';
import { useGlobalContext, GlobalContextProvider, GlobalContext } from '../src/context/GlobalStore';
import { render, container, waitFor, fireEvent } from '@testing-library/react';
import App from '../src/components/App';
import RelatedCard from '../src/components/related-items/related/RelatedCard'

const value = [
  {product: {id: 40344, name: 'Camo Onesie', category: 'Jackets', price: '140.00'}},
  {rating: {averageRating: 3.75}},
  {style: {url: null}}
];

describe("App testing", () => {
  test('renders the landing page', () => {
    render(<App />);
  });
})

// describe("Component Test", () => {
//   test('Related Items component in React', () => {
//     const {container} = render(<RelatedItems />)
//   })
// })

it('should render related items', () => {
  test('Related Item Render', async () => {
    const {container} =  await render(

        <RelatedCard value={value}/>
    )
  })
})