import { AnimatePresence } from 'framer-motion';
import { RiGithubLine, RiPaletteFill } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCommandLine } from '../../slices/app';
import { Button } from '../ui';
import Styled from './Footer.styles';

function Footer() {
  const dispatch = useAppDispatch();
  const { themeName } = useAppSelector(({ config }) => config);
  const openCommandLine = () => {
    dispatch(setCommandLine({ isOpen: true, initial: 'themeName' }));
  };
  const { isTyping } = useAppSelector(({ typingTest }) => typingTest);

  return (
    <Styled.Footer>
      <AnimatePresence>
        {!isTyping && <>
          <Styled.Buttons key="left">
            <Button text href="https://github.com/nekusu">
              <RiGithubLine />nekusu
            </Button>
          </Styled.Buttons>
          <Styled.Buttons key="right">
            <Button text onClick={openCommandLine}>
              <RiPaletteFill />{themeName}
            </Button>
          </Styled.Buttons>
        </>}
      </AnimatePresence>
    </Styled.Footer>
  );
}

export default Footer;
