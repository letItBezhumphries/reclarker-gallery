import React from "react";
import { Container } from "react-bootstrap";
import Styled from "styled-components";

const ContentContainer = Styled(Container)`
  width: 100vw;
  padding: 0 0;
  margin: 0 0;
  min-height: 500px;
  box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;

`;

const ScrollerContainer = ({ children }) => {
  return <ContentContainer fluid>{children}</ContentContainer>;
};

export default ScrollerContainer;
