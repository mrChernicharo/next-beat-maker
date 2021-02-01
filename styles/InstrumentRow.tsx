import styled from "styled-components";

export const InstrumentRow = styled.div`
  width: 100vw;
  height: 50px;
  border: 1px solid #707070;
  display: flex;
  border-bottom: 1px solid #aeaeae;

  > div {
    /* border: 1px solid #707070; */
    width: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &.bar-head {
      margin-left: 20px;
    }

    &.active-note {
      background: green;
    }
  }
`;
