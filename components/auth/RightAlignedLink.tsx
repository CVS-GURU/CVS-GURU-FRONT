import React from 'react';
import styled from 'styled-components';

import Link from 'next/link';
const Aligner = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

const StyledLink = styled.div`
  color: grey;
  &:hover {
    color: grey;
  }
`;

const RightAlignedLink = ({ onClick, children }) => (
  <Aligner>
    <StyledLink onClick={onClick}>{children}</StyledLink>
  </Aligner>
);

export default RightAlignedLink;
