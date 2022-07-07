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
  flex: 1;
`;

const Wrapper = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 16px;

  button {
    padding: 14px 28px;
    font-size: 26px;
  }
`;

const Styled = {
  Home,
  Wrapper,
  Buttons,
};

export default Styled;
