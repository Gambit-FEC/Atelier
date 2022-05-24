import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalStore';

function relatedCard(info) {
  // console.log('INFO: ', info.info);
  const placeholder = 'http://placecorgi.com/260/180';

  // const { productInfo } = useGlobalContext();
  return (
    <StyledCard>
      <StyledImage
        src={info.info.style.url === null ? placeholder : info.info.style.thumbnail_url}
        alt="product-img"
      />
      <StyledCategory>
        { info.info.product.category.toUpperCase() }
      </StyledCategory>
      <StyledName>
        { info.info.product.name }
      </StyledName>
      <StyledCost>
        { `$${info.info.product.price}` }
      </StyledCost>
      <p className="card-rating">
        { info.info.rating.averageRating }
      </p>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  background-color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  color: black;
  height: auto;
  width: 200px;
  border-style: solid;
  border-width: thick;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
`;
const StyledCategory = styled.p`
  font-weight: normal;
`;
const StyledName = styled.p`
  font-weight: bold;
`;
const StyledCost = styled.p`
  font-weight: normal;
`;

export default relatedCard;
