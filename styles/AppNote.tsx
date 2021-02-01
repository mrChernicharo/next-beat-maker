import styled from "styled-components";

interface IAppNoteProps {
  // background: string;
  play: boolean;
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

  > div {
    pointer-events: none;
  }
`;
