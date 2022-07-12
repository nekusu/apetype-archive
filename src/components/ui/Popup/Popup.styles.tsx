import { m } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
})) <{ $top?: boolean; }>`
  height: 100%;
  width: 100%;
  padding: 10vh 32px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  align-items: ${p => p.$top ? 'flex-start' : 'center'};
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1.5px);
  user-select: none;
`;

const Popup = styled.div<{ $maxWidth?: number; }>`
  width: 100%;
  max-width: ${p => p.$maxWidth ? p.$maxWidth : 400}px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  background-color: ${p => p.theme.bg};
  color: ${p => p.theme.sub};
  border-radius: 8px;
  overflow: hidden;
  transition: background-color 0.25s, color 0.25s;
`;

const Styled = {
  Wrapper,
  Popup,
};

export default Styled;
