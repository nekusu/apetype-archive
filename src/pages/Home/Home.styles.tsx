import { m } from 'framer-motion';
import styled from 'styled-components';
import { Button } from '../../components/ui';

const Home = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  width: 100%;
  padding-bottom: 70px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const CustomConfig = styled.div`
  padding: 24px;

  h4 {
    font-size: 24px;
    font-weight: 400;
  }

  &, form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const Wrapper = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const TestButtons = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  height: 24px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
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

const Bottom = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const Tips = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${p => p.theme.sub};
  transition-property: color;
`;

const CommandLineButton = styled(Button)`
  padding: 10px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-size: 18px;
  border-radius: 50%;
`;

const Styled = {
  Home,
  CustomConfig,
  Wrapper,
  TestButtons,
  Buttons,
  Bottom,
  Tips,
  CommandLineButton,
};

export default Styled;
