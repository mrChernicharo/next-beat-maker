import styled from "styled-components";
import { FiPlus, FiTrash } from "react-icons/fi";
export function InstrumentsControl({ add, drop }) {
  return (
    <div>
      <Button onClick={() => add()}>
        <FiPlus />
      </Button>
      <Button onClick={() => drop(1)}>
        <FiTrash />
      </Button>
    </div>
  );
}

const Button = styled.button`
  width: 50px;
  height: 40px;
  background: transparent;
  border: #707070;
  color: #fff;
  outline: none;
  font-size: 20px;

  &:hover {
    cursor: pointer;
    opacity: 0.76;
  }
`;
