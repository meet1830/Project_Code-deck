import React from "react";
import styled from "styled-components";

const StyledLeftPane = styled.div`
  background: #221f20;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  width: 165px;
  margin-bottom: 1rem;
`;

const MainHeading = styled.h1`
  font-size: 2.4rem;
  font-weight: 400;
  color: white;
  margin-bottom: 0.75rem;
`;

const SubHeading = styled.h2`
  font-size: 1.5rem;
  color: white;
  opacity: 0.75;
  margin-bottom: 1.5rem;
  font-weight: 400;
`;

const LeftPane = () => {
  return (
    <StyledLeftPane>
      <ContentContainer>
        <Logo src="/logo.png" alt="Logo" />
        <MainHeading>Code Deck</MainHeading>
        <SubHeading>Code. Compile. Debug.</SubHeading>
        <a href="https://www.google.com">+ Create New Background</a>
      </ContentContainer>
    </StyledLeftPane>
  );
};

export default LeftPane;
