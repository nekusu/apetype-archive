import styled from 'styled-components';

const Header = styled.header`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  user-select: none;
`;

const Logo = styled.div`
  width: fit-content;
  display: flex;
  font-family: 'Lexend Deca';
  cursor: pointer;
`;

const Text = styled.div`
  margin-bottom: 7px;
  position: relative;
  font-size: 32px;
  color: ${p => p.theme.text};
  transition: color 0.25s;
`;

const TopText = styled.div`
  position: absolute;
  top: -2px;
  left: 12px;
  font-size: 10px;
  color: ${p => p.theme.sub};
  transition: color 0.25s;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  button {
    font-size: 20px;
  }
`;

const Styled = {
  Header,
  Logo,
  Text,
  TopText,
  Menu,
};

export default Styled;
