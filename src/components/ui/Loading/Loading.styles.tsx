import { m } from 'framer-motion';
import styled from 'styled-components';
import { CircularProgress } from 'react-cssfx-loading';

const Container = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Loading = styled(CircularProgress).attrs((props) => ({
  color: props.theme.main,
}))`
  height: 100%;
  max-height: 80px;
  width: 100%;
  max-width: 80px;
`;

const Styled = {
  Container,
  Loading,
};

export default Styled;
