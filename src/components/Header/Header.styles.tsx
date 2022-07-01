import { m } from 'framer-motion';
import styled from 'styled-components';
import { ReactComponent as IconSvg } from '../../images/icon.svg';

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
  align-items: center;
  gap: 8px;
  font-family: 'Lexend Deca';
  cursor: pointer;
`;

const Icon = styled(IconSvg) <{ $typing: boolean; }>`
  height: 25px;
  width: 35px;
  stroke: ${p => p.$typing ? p.theme.sub : p.theme.main};
  transition: stroke 0.25s;
`;

const Text = styled.div<{ $typing: boolean; }>`
  margin-bottom: 7px;
  position: relative;
  font-size: 32px;
  color: ${p => p.$typing ? p.theme.sub : p.theme.text};
  transition: color 0.25s;
`;

const TopText = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  position: absolute;
  top: -1px;
  left: 12px;
  font-size: 10px;
  color: ${p => p.theme.sub};
  transition: color 0.25s;
`;

const Menu = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
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
  Icon,
  Text,
  TopText,
  Menu,
};

export default Styled;
