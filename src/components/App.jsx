import React, { useState } from "react";
import GlobalContext from '../context/GlobalStore.jsx';
import RatingsAndReviews from './ratings-reviews/index.jsx';

function App() {
  // state item id
  const [id] = useState(() => 1);

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
