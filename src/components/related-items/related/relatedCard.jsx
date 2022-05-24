import React, { useState } from 'react';
import { FcNext, FcPrevious} from 'react-icons/fc';
import '../carousel/Carousel.css';

function relatedCard(data) {
  const placeholder = 'http://placecorgi.com/260/180';
  const [current, setCurrent] = useState(0);
  const length = data.data.length;

  console.log(data.data);
  console.log(length);
  return (
    <section className="slider">
      <FcPrevious className="left-arrow" />
      <FcNext className="right-arrow" />
      {/* <FcPrevious className="left-arrow" onClick={prevSlide} />
      <FcNext className="right-arrow" onClick={nextSlide} /> */}
      {
        data.data.map((info, index) => {
          return (
          <p key={index}>{info.product.name}</p>
          )
        })
      }
    </section>
  );
}

export default relatedCard;
