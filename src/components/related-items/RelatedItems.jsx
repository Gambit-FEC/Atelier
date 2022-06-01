import React from 'react';
import styled from 'styled-components';
import RelatedList from './related/relatedList';
import OutfitList from './outfit/outfitList';

export default function RelatedItems() {
  return (
    <Container id="related-items">
      <RelatedList />
      <OutfitList />
    </Container>
  );
}

const Container = styled.div`
position: relative;
display: flex;
flex-direction: column;
`;
