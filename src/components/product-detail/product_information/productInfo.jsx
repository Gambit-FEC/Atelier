import React from 'react';
import { useGlobalContext } from '../../../context/GlobalStore';





const onFacebookClick = () => {
  window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fparse.com', 'Facebook');
};

const onTwitterClick = () => {
  window.open('https://twitter.com/intent/tweet', 'Twitter');
};

const onPinterestClick = () => {
  window.open('https://www.pinterest.com/pin-builder/', 'Pinterest');
};


export default function ProductInfo() {
  const { productId } = useGlobalContext();
  return (
    <>
      <h1>
        product info?
        {' '}
        {productId}
      </h1>
      <h4>product info test</h4>
      <div>wow product info</div>
      <p>hello product info</p>
      <button src="./logoPhotos/facebook.png" onClick={() => onFacebookClick()} >FB</button>
      <button src="./logoPhotos/twitter.png" onClick={() => onTwitterClick()} >Twitter</button>
      <button src="./logoPhotos/interest.png" onClick={() => onPinterestClick()} >Pin</button>
    </>
  );
}
