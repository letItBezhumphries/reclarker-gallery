import React from "react";
import "./AnimatedButton.css";
import Styled from "styled-components";

const AnimatedBtn = Styled.a`
  background-color: #fff;
  color: #777;
  
  &:link,
  &:visited {
    text-transform: uppercase;
    text-decoration: none;
    padding: 15px 40px;
    display: inline-block;
    border-radius: 100px;
    position: relative;
    transition: all .2s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,.2);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
  }

  &::after {
    content: "";
    display: inline-block;
    background-color: #fff;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all .4s;
  }

  &:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
  }
`;

const AnimatedButton = ({ text, to, color }) => {
  return (
    <a href={`${to}`} className={`animated-btn animated-btn-${color}`}>
      {text}
    </a>
  );
};

export default AnimatedButton;
