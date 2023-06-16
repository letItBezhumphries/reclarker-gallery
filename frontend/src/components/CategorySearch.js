import React from "react";
import SectionRow from "./SectionRow";
import Styled from "styled-components";

const CategoryAnchor = Styled.a`
  display: flex;
  text-decoration: none;
  width: 1fr;
  text-align: center;
  color: #cf6766;
  
  &:hover {
    text-decoration: none;
    background-color: #cf6766;
    color: #fff;
    cursor: pointer;
  }
`;

const CategoryBtn = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d3d4d4;
  height: 43px;
  font-size: 13px;
  font-family: "Lato";
  font-weight: 500;
  padding: 0 28px 0 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: .5px;

  &:focus,
  &:active {
    outline: none;
  }
`;

const CategorySearch = ({ categories }) => {
  let categoryList = categories.map(({ style, category }) => {
    return (
      <CategoryAnchor
        href={`/artsits/s/${category}`}
        key={category}
        className="category-search-btn"
      >
        <CategoryBtn>{style}</CategoryBtn>
      </CategoryAnchor>
    );
  });
  return <SectionRow text="Artists by category">{categoryList}</SectionRow>;
};

export default CategorySearch;
