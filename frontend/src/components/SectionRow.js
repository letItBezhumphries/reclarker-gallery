import React from "react";
import Styled from "styled-components";

const Row = Styled.div`
  width: 100%;
  padding: 1rem 5rem;
`;

const Heading = Styled.h2`
  font-size: 20px;
  width: 100%;
  text-align: center;
  font-family: "Lato";
  font-weight: normal;
  margin-bottom: 2rem;
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & span {
    margin-left: 20px;
    display: inline-block;
    font-size: 16px;
    font-weight: normal;
    color: #a9a9a9;
  }

  &::after {
    content: "  ";
    margin-top: 10px;
    box-sizing: border-box;
    width: 10%;
    border-bottom: .5px solid black;
  }
`;

const Container = Styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
`;

const SectionRow = ({ text, subHeading, children }) => {
  return (
    <Row>
      <Heading>
        {text}
        {subHeading !== undefined ? <span>{subHeading}</span> : null}
      </Heading>
      <Container>{children}</Container>
    </Row>
  );
};

export default SectionRow;
