import { m } from 'framer-motion';
import styled from 'styled-components';

const TypingTest = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  max-height: 122px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  user-select: none;
`;

const Input = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
`;

const OutOfFocus = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}))`
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: ${p => p.theme.text};
  pointer-events: none;
  transition: color 0.25s;
`;

const Wrapper = styled.div<{ $blurred: boolean; }>`
  padding: 4px 2px;
  position: relative;
  flex: 1 1;
  opacity: ${p => p.$blurred ? '0.4' : '1'} !important;
  filter: ${p => p.$blurred ? 'blur(5px)' : 'none'};
  cursor: ${p => p.$blurred ? 'pointer' : 'auto'};
  overflow: hidden;
  transition: opacity 0.4s, filter 0.4s;
`;

const Caret = styled(m.div).attrs(() => ({
  transition: {
    opacity: { repeat: Infinity, duration: 1 },
    top: { ease: 'easeOut', duration: 0.1 },
    left: { ease: 'easeOut', duration: 0.1 },
  },
}))`
  height: 35px;
  width: 3px;
  margin-top: -2px;
  position: absolute;
  border-radius: 2px;
  background-color: ${p => p.theme.caret};
  transition: background-color 0.25s;
`;

const Words = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  line-height: 24px;
`;

const Word = styled.div<{ $error: boolean; }>`
  margin-block: 2px;
  display: flex;
  font-size: 24px;
  border-bottom: 2px solid ${p => p.$error ? p.theme.colorfulError : 'transparent'};
  transition: border-color 0.1s ease-out;
`;

const Letter = styled.span<{ $status: ApeTypes.Letter['status']; }>`
  display: inline-block;
  color: ${p => p.$status === 'correct'
    ? p.theme.main
    : p.$status === 'incorrect'
      ? p.theme.colorfulError
      : p.$status === 'extra'
        ? p.theme.colorfulErrorExtra
        : p.theme.sub};
  transition: color 0.1s ease-out;
`;

const Styled = {
  TypingTest,
  Input,
  OutOfFocus,
  Wrapper,
  Caret,
  Words,
  Word,
  Letter,
};

export default Styled;
