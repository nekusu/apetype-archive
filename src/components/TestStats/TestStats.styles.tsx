import { m } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 24px;
  padding-inline: 2px;
  user-select: none;
`;

const TestStats = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  display: flex;
  gap: 30px;
  font-size: 24px;
  line-height: 24px;
  color: ${p => p.theme.main};
  transition: color 0.25s;
`;

const Styled = {
  Wrapper,
  TestStats,
};

export default Styled;
