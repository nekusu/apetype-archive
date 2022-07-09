import { m } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  height: 100%;
  width: 100%;
  padding: 80px 32px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
  user-select: none;
`;

const Popup = styled.div<{ $padding?: number, $maxWidth?: number; }>`
  width: 100%;
  max-width: ${p => p.$maxWidth || '400px'};
  padding: ${p => p.$padding || '26px'};
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 13px;
  background-color: ${p => p.theme.bg};
  color: ${p => p.theme.sub};
  border-radius: 8px;
  transition: background-color 0.25s, color 0.25s;
`;

const Title = styled.div`
  font-size: 24px;
`;

const Styled = {
  Wrapper,
  Popup,
  Title,
};

export default Styled;
