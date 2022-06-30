import { m } from 'framer-motion';
import styled from 'styled-components';

const Home = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Styled = {
  Home,
};

export default Styled;
