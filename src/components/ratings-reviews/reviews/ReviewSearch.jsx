import React, { useEffect, useState } from 'react';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function ReviewSearch() {
  const { setReviewSearch } = useRAndRContext();
  const [searchText, setSearchText] = useState('');
  function handleChange(e) {
    setSearchText(e.target.value);
  }
  useEffect(() => {
    if (searchText.length >= 3) {
      setReviewSearch(searchText);
    } else {
      setReviewSearch('');
    }
  }, [searchText]);
  return (
    <form onSubmit={(e) => { e.preventDefault(); }}>
      <input type="text" placeholder="Search..." value={searchText} onChange={handleChange} />
    </form>
  );
}
