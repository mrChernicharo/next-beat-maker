import styled from "styled-components";

export const InstrumentRow = styled.div`
  width: 100vw;
  display: flex;
  border-bottom: 1px solid #aeaeae;

  > div {
    border: 1px solid #aeaeae;
    width: 24px;

    &.active-note {
      background: green;
    }
  }
`;
