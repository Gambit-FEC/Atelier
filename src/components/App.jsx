import React, { useState } from 'react';
import GlobalContext from '../context/GlobalStore';
import RatingsAndReviews from './ratings-reviews/RatingsAndReviews';

function App() {
  // state item id
  const [id, setId] = useState(() => 1);

  return (
    <GlobalContext.Provider value={id}>
      {/* <EsthersWidget />
      <DanikasWidget />
      <AndysWidget /> */}
      <RatingsAndReviews />
    </GlobalContext.Provider>
  );
}

export default App;
