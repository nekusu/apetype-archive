import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { formatDuration } from 'date-fns';
import useEventListener from 'use-typed-event-listener';
import { useThrottledCallback } from 'use-debounce';
import uniqid from 'uniqid';
import { RiArrowRightSLine, RiTerminalLine, RiGlobeFill, RiRestartLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Keymap, TestResults, TestStats, TypingTest } from '../../components';
import { Button, Input, Key, Loading, Popup } from '../../components/ui';
import { setCommandLine } from '../../slices/app';
import { setTime, setWords } from '../../slices/config';
import { setIsTyping, setIsFinished, setIsTestPopupOpen } from '../../slices/typingTest';
import Styled from './Home.styles';

interface Props {
  setRandomTheme: () => void;
}

function Home({ setRandomTheme }: Props) {
  const dispatch = useAppDispatch();
  const { commandLine } = useAppSelector(({ app }) => app);
  const {
    mode,
    time,
    words,
    quickRestart,
    language,
    transitionSpeed,
    keymap,
    keyTips,
  } = useAppSelector(({ config }) => config);
  const {
    testLanguage,
    isTyping,
    isFinished,
    isTestPopupOpen,
  } = useAppSelector(({ typingTest }) => typingTest);
  const [id, setId] = useState(uniqid());
  const [customAmount, setCustomAmount] = useState(0);
  const testId = mode + '-' + (mode === 'time' ? time : mode === 'words' ? words : '')
    + '-' + testLanguage.name.replace(/\s/g, '_') + '-' + id;
  const restartTest = useThrottledCallback(() => {
    setId(uniqid());
    setRandomTheme();
    dispatch(setIsFinished(false));
    dispatch(setIsTyping(false));
  }, transitionSpeed * 2000, { trailing: false });
  const handleRestartKey = (e: KeyboardEvent) => {
    if (quickRestart === 'off') return;
    if (e.key === (quickRestart !== 'esc' ? 'Tab' : 'Escape')) {
      e.preventDefault();
      restartTest();
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'time') {
      dispatch(setTime(customAmount));
    } else {
      dispatch(setWords(customAmount));
    }
    dispatch(setIsTestPopupOpen(false));
  };

  useEventListener(
    !commandLine.isOpen && !isTestPopupOpen ? window : null,
    'keydown',
    handleRestartKey,
  );
  useEffect(() => {
    setCustomAmount(mode === 'time' ? time : words);
    dispatch(setIsFinished(false));
  }, [dispatch, mode, time, words, language]);

  return (
    <Styled.Home>
      <AnimatePresence exitBeforeEnter>
        {!testLanguage.words.length
          ? <Loading />
          : isFinished
            ? <Styled.Wrapper key="result">
              <TestResults />
              <Styled.Buttons>
                <Button alt title="Next test" onClick={restartTest}>
                  <RiArrowRightSLine />
                </Button>
              </Styled.Buttons>
            </Styled.Wrapper>
            : <Styled.Wrapper key={testId}>
              <AnimatePresence>
                {!isTyping && (
                  <Styled.TestButtons>
                    <Button
                      text
                      onClick={() => dispatch(setCommandLine({
                        isOpen: true,
                        initial: 'language',
                      }))}
                    >
                      <RiGlobeFill /> {testLanguage.name}
                    </Button>
                  </Styled.TestButtons>
                )}
              </AnimatePresence>
              <TestStats />
              <TypingTest />
              {keymap !== 'off' && <Keymap />}
              {quickRestart === 'off' && (
                <Styled.Buttons>
                  <Button alt title="Restart test" onClick={restartTest}>
                    <RiRestartLine />
                  </Button>
                </Styled.Buttons>
              )}
            </Styled.Wrapper>
        }
      </AnimatePresence>
      <AnimatePresence>
        {isTestPopupOpen && (
          <Popup close={() => dispatch(setIsTestPopupOpen(false))}>
            <Styled.CustomConfig>
              <h4>{mode === 'time' ? 'Test duration' : 'Word amount'}</h4>
              {mode === 'time' && getDurationPreview(+customAmount)}
              <form onSubmit={handleSubmit}>
                <Input
                  type="number"
                  min="0"
                  max={mode === 'time' ? '3600' : '5000'}
                  value={customAmount}
                  onChange={({ target: { value } }) => setCustomAmount(+value)}
                  autoFocus
                />
                <div>
                  You can start an infinite test by inputting 0.
                  To stop the test, use <Key>shift</Key> + <Key>enter</Key>
                </div>
                <Button type="submit">ok</Button>
              </form>
            </Styled.CustomConfig>
          </Popup>
        )}
        {!isTyping && (
          <Styled.Bottom key="bottom">
            {keyTips === 'show' && (
              <Styled.Tips>
                {(mode === 'zen' || mode === 'words' && !words || mode === 'time' && !time) && (
                  <div><Key>shift</Key> + <Key>enter</Key> - stop test</div>
                )}
                <div>
                  <Key>{quickRestart !== 'esc' ? 'tab' : 'esc'}</Key>
                  {quickRestart === 'off' ? <> + <Key>enter</Key></> : null} - restart test
                </div>
                <div><Key>{quickRestart !== 'esc' ? 'esc' : 'tab'}</Key> - command line</div>
              </Styled.Tips>
            )}
            <Styled.CommandLineButton
              title="Command line"
              active
              onClick={() => dispatch(setCommandLine({ isOpen: true }))}
            >
              <RiTerminalLine />
            </Styled.CommandLineButton>
          </Styled.Bottom>
        )}
      </AnimatePresence>
    </Styled.Home>
  );
}

const getDurationPreview = (seconds: number) => {
  if (!seconds) {
    return 'Infinite test';
  } else if (seconds < 0) {
    return 'Error: invalid value';
  } else if (seconds > 3600) {
    return 'Error: too long';
  }
  const date = new Date(seconds * 1000);
  return `Total time: ${formatDuration({
    hours: date.getUTCHours(),
    minutes: date.getUTCMinutes(),
    seconds: date.getUTCSeconds(),
  })}`;
};

export default Home;
