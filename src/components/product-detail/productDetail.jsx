import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

export const UserContext = React.createContext();



//styled-components ex
// Create a Title component that'll render an <h1> tag with some styles
const ProductDetailContainer = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;


export default function ProductDetail() {
  //test------
  const [product, setProduct] = useState([]);

  const inputState = useState({ title: '', amount: ''});



  function User() {
    const value = React.useContext(UserContext);

    return <h1>{value}</h1>;
  }


  return (
    <Wrapper>
      <ProductDetailContainer>

        <div>
          <h2>productDetail</h2>
          <div>wow</div>
          <p>hello</p>
        </div>

      </ProductDetailContainer>
    </Wrapper>
  )
};
