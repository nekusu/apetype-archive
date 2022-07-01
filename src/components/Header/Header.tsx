import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  RiKeyboardBoxFill,
  RiVipCrownFill,
  RiInformationFill,
  RiSettingsFill,
  RiLoginCircleFill,
} from 'react-icons/ri';
import { useAppSelector } from '../../app/hooks';
import { Button } from '../ui';
import Styled from './Header.styles';

function Header() {
  const { isTyping } = useAppSelector(({ typingTest }) => typingTest);
  const navigate = useNavigate();

  return (
    <Styled.Header>
      <Styled.Logo onClick={() => navigate('/')}>
        <Styled.Icon $typing={isTyping} />
        <Styled.Text $typing={isTyping}>
          <AnimatePresence>
            {!isTyping && <Styled.TopText>ape see</Styled.TopText>}
          </AnimatePresence>
          apetype
        </Styled.Text>
      </Styled.Logo>
      <AnimatePresence>
        {!isTyping && (
          <Styled.Menu>
            <Button text title="Home" navigate="/">
              <RiKeyboardBoxFill />
            </Button>
            <Button text title="Leaderboards" navigate="/leaderboards">
              <RiVipCrownFill />
            </Button>
            <Button text title="About" navigate="/about">
              <RiInformationFill />
            </Button>
            <Button text title="Settings" navigate="/settings">
              <RiSettingsFill />
            </Button>
            <Button text title="Login" navigate="/login">
              <RiLoginCircleFill />
            </Button>
          </Styled.Menu>
        )}
      </AnimatePresence>
    </Styled.Header>
  );
}

export default Header;
