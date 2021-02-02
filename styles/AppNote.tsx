import styled from "styled-components";

interface IAppNoteProps {
  play: boolean;
  barHead: boolean;
}

export const AppNote = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid #efefef;
  border-radius: 2px;
  background-color: ${(props: IAppNoteProps) =>
    props.play ? "blue" : "transparent"};

  transition: 0.2s;

  &:hover {
    cursor: pointer;
    opacity: 0.82;
  }

  &.current-note {
    border-bottom: 3px solid red;
  }

  > div {
    color: ${(props: IAppNoteProps) => (props.barHead ? "#fff" : "#787878")};
    pointer-events: none;
  }
`;
