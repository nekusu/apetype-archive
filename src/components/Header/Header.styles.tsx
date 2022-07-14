import { m } from 'framer-motion';
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
  align-items: center;
  gap: 8px;
  font-family: 'Lexend Deca';
  cursor: pointer;
`;

const Text = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.75 } },
})) <{ $typing: boolean; }>`
  margin-bottom: 7px;
  position: relative;
  font-size: 32px;
  color: ${p => p.$typing ? p.theme.sub : p.theme.text};
  transition-property: color;
`;

const TopText = styled(m.div).attrs(() => ({
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.75,
      duration: 0.75,
      type: 'spring',
      stiffness: 30,
      damping: 10,
    },
  },
  exit: { opacity: 0 },
}))`
  position: absolute;
  top: -1px;
  left: 12px;
  font-size: 10px;
  color: ${p => p.theme.sub};
  transition-property: color;
`;

const Menu = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.25, duration: 0.5 } },
  exit: { opacity: 0 },
}))`
  display: flex;
  align-items: center;
  gap: 6px;

  button {
    font-size: 20px;
  }
`;

const Config = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 1px;
`;

const ConfigGroup = styled.div`
  display: flex;
  gap: 5px;

  button {
    padding: 0;
    font-size: 11px;
  }
`;

const Styled = {
  Header,
  Logo,
  Text,
  TopText,
  Menu,
  Config,
  ConfigGroup,
};

export default Styled;
