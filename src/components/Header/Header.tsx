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
import { Button, LogoIcon } from '../ui';
import configList from '../../config/_list';
import Styled from './Header.styles';

function Header() {
  const dispatch = useAppDispatch();
  const { mode, time, words } = useAppSelector(({ config }) => config);
  const { isTyping } = useAppSelector(({ typingTest }) => typingTest);
  const navigate = useNavigate();
  const location = useLocation();
  const menuButtons = [
    { title: 'Home', icon: <RiKeyboardBoxFill />, to: '/' },
    { title: 'Leaderboards', icon: <RiVipCrownFill />, to: '/leaderboards' },
    { title: 'About', icon: <RiInformationFill />, to: '/about' },
    { title: 'Settings', icon: <RiSettingsFill />, to: '/settings' },
    { title: 'Login', icon: <RiLoginCircleFill />, to: '/login' },
  ];
  const { options: modes, action: setMode } = configList.mode;
  const { options, action } = mode === 'time' ? configList.time : configList.words;

  return (
    <Styled.Header>
      <Styled.Logo onClick={() => navigate('/')}>
        <LogoIcon />
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
            {menuButtons.map(({ title, icon, to }) => (
              <Button
                key={title}
                text
                title={title}
                onClick={() => navigate(to)}
              >
                {icon}
              </Button>
            ))}
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
