import { m } from 'framer-motion';
import styled from 'styled-components';

const Footer = styled.footer`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const Buttons = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  display: flex;
  gap: 20px;

  button, a {
    padding-inline: 0;
    font-size: 13px;
  }
`;

const Styled = {
  Footer,
  Buttons,
};

export default Styled;
