import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-family: inherit;
  font-size: 16px;
  caret-color: ${p => p.theme.main};
  background-color: ${p => p.theme.subAlt};
  color: ${p => p.theme.sub};
  border-radius: 8px;
  transition-property: background-color, color;

  &:focus {
    color: ${p => p.theme.text};
  }
`;

export default Input;
