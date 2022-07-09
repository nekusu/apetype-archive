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
  transition: background-color 0.25s, color 0.25s;

  &:focus {
    color: ${p => p.theme.text};
  }
`;

const Styled = {
  Input,
};

export default Styled;
