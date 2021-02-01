import styled from "styled-components";

export const AppSelectContainer = styled.div`
  border: 1px solid purple;
  width: 200px;
  height: 50px;
  display: flex;
  flex-direction: column;

  label {
    background-image: linear-gradient(60deg, #349191, #444);
  }
`;

export const AppSelect = styled.select`
  width: 100px;
  background: #40467a;
  color: #fff;
`;
