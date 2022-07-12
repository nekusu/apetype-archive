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
import { setIsTestPopupOpen } from '../../slices/typingTest';
import { Button } from '../ui';
import configList from '../../config/_list';
import Styled from './Header.styles';

function Header() {
  const dispatch = useAppDispatch();
  const { mode, time, words } = useAppSelector(({ config }) => config);
  const { isTyping } = useAppSelector(({ typingTest }) => typingTest);
  const navigate = useNavigate();
  const location = useLocation();
  const { options: modes, action: setMode } = configList.mode;
  const { options, action } = mode === 'time' ? configList.time : configList.words;

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
        {!isTyping && <>
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
          {location.pathname === '/' && (
            <Styled.Config>
              <Styled.ConfigGroup>
                {modes.map((m) => (
                  <Button
                    key={m}
                    onClick={() => dispatch(setMode(m as ApeTypes.Config['mode']))}
                    text
                    active={mode === m}
                  >
                    {m}
                  </Button>
                ))}
              </Styled.ConfigGroup>
              {(mode === 'time' || mode === 'words') && (
                <Styled.ConfigGroup>
                  {options.map((option) => (
                    <Button
                      key={option}
                      onClick={() => action && dispatch(action(option))}
                      text
                      active={mode === 'time' ? time === option : words === option}
                    >
                      {option}
                    </Button>
                  ))}
                  <Button
                    key="custom"
                    onClick={() => dispatch(setIsTestPopupOpen(true))}
                    text
                    active={!options.includes(mode === 'time' ? time : words)}
                  >
                    <RiSettings4Fill />
                  </Button>
                </Styled.ConfigGroup>
              )}
            </Styled.Config>
          )}
        </>}
      </AnimatePresence>
    </Styled.Header>
  );
}

export default Header;
