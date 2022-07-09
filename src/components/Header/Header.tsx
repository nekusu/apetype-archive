import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  RiKeyboardBoxFill,
  RiVipCrownFill,
  RiInformationFill,
  RiSettingsFill,
  RiLoginCircleFill,
} from 'react-icons/ri';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setMode, setTime, setWords } from '../../slices/config';
import { Button } from '../ui';
import Styled from './Header.styles';

function Header() {
  const dispatch = useAppDispatch();
  const { mode, time, words } = useAppSelector(({ config }) => config);
  const { isTyping } = useAppSelector(({ typingTest }) => typingTest);
  const navigate = useNavigate();
  const modes = ['time', 'words'];
  const timeAmount = [15, 30, 60, 120];
  const wordsAmount = [10, 25, 50, 100];

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
          <Styled.Menu key="menu">
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
        {!isTyping && (
          <Styled.Config key="config">
            <Styled.ConfigGroup>
              {modes.map((m) => (
                <Button
                  onClick={() => dispatch(setMode(m as ApeTypes.Config['mode']))}
                  key={m}
                  text
                  active={mode === m}
                >
                  {m}
                </Button>
              ))}
            </Styled.ConfigGroup>
            <Styled.ConfigGroup>
              {(mode === 'time' ? timeAmount
                : mode === 'words' ? wordsAmount
                  : []).map((x) => (
                    <Button
                      onClick={() => {
                        if (mode === 'time') {
                          dispatch(setTime(x as ApeTypes.Config['time']));
                        } else if (mode === 'words') {
                          dispatch(setWords(x as ApeTypes.Config['words']));
                        }
                      }}
                      key={x}
                      text
                      active={
                        mode === 'time' && time === x ||
                        mode === 'words' && words === x
                      }
                    >
                      {x}
                    </Button>
                  ))}
            </Styled.ConfigGroup>
          </Styled.Config>
        )}
      </AnimatePresence>
    </Styled.Header>
  );
}

export default Header;
