import { m } from 'framer-motion';
import styled from 'styled-components';

const Home = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  flex: 1;
`;

const Styled = {
  Home,
};

export default Styled;
