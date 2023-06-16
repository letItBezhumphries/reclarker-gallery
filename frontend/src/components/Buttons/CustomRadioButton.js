import React from "react";
import "./CustomRadioButton.css";
// import Styled from "styled-components";

// const styledFormGroup = Styled.div`
//   width: 49%;
//   display: inline-block;
// `;

// const styledInput = Styled.input``;

// const styledButton = Styled.span``;

// const styledLabel = Styled.label`
//   font-size: 1.6rem;
//   cursor: pointer;
// `;

export const CustomRadioButton = ({ id, label, name }) => {
  return (
    <div className="form-radio-group">
      <input type="radio" className="input-radio" id={id} name={name} />
      <label htmlFor={id} className="input-label">
        <span className="input-radio-btn"></span>
        {label}
      </label>
    </div>
  );
};
