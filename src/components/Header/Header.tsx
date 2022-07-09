import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  RiKeyboardBoxFill,
  RiVipCrownFill,
  RiInformationFill,
  RiSettingsFill,
  RiLoginCircleFill,
  RiSettings4Fill,
} from 'react-icons/ri';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setMode, setTime, setWords } from '../../slices/config';
import { setIsTestPopupOpen } from '../../slices/typingTest';
import { Button } from '../ui';
import Styled from './Header.styles';

function Header() {
  const dispatch = useAppDispatch();
  const { mode, time, words } = useAppSelector(({ config }) => config);
  const { isTyping } = useAppSelector(({ typingTest }) => typingTest);
  const navigate = useNavigate();
  const location = useLocation();
  const modes = ['time', 'words'];
  const timeAmount = [15, 30, 60, 120];
  const wordAmount = [10, 25, 50, 100];
  const setAmount = mode === 'time' ? setTime : setWords;
  const amount = mode === 'time' ? timeAmount : wordAmount;

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
          <>
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
            {location.pathname === '/' && (
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
                {(mode === 'time' || mode === 'words') && (
                  <Styled.ConfigGroup>
                    {amount?.map((x) => (
                      <Button
                        onClick={() => setAmount && dispatch(setAmount(x))}
                        key={x}
                        text
                        active={mode === 'time' && time === x ||
                          mode === 'words' && words === x}
                      >
                        {x}
                      </Button>
                    ))}
                    <Button
                      onClick={() => dispatch(setIsTestPopupOpen(true))}
                      text
                      active={mode === 'time' && !timeAmount.includes(time) ||
                        mode === 'words' && !wordAmount.includes(words)}
                    >
                      <RiSettings4Fill />
                    </Button>
                  </Styled.ConfigGroup>
                )}
              </Styled.Config>
            )}
          </>
        )}
      </AnimatePresence>
    </Styled.Header>
  );
}

export default Header;
