import styled from "styled-components";

export const AppPlayPause = styled.div`
  border: 1px solid #787878;
  width: 100px;
  height: 40px;
  display: flex;
  border-radius: 4px;

  button {
    background: transparent;
    width: 100%;
    outline: none;
    border: none;
    color: #fff;
    border-radius: 4px;

    &:hover {
      opacity: 0.8;
    }
    &:active {
      /* border: 4px solid rgba(255, 255, 255, 0.9); */
      box-shadow: inset 0px 0px 8px 0px rgba(255, 255, 255, 0.9);

      > :first-child {
        border: purple;
        fill: #787878;
      }
    }
  }
`;
