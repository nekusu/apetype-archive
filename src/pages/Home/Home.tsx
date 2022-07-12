import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { formatDuration } from 'date-fns';
import useEventListener from 'use-typed-event-listener';
import uniqid from 'uniqid';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CommandLine, Keymap, TestResults, TestStats, TypingTest } from '../../components';
import { Button, Input, Loading, Popup } from '../../components/ui';
import { setThemeName, setTime, setWords } from '../../slices/config';
import { setTestLanguage, setIsFinished, setIsTestPopupOpen } from '../../slices/typingTest';
import themes from '../../themes/_list';
import languages from '../../languages/_list';
import Styled from './Home.styles';

function Home() {
  const dispatch = useAppDispatch();
  const {
    themeName,
    randomTheme,
    mode,
    time,
    words,
    language,
  } = useAppSelector(({ config }) => config);
  const { testLanguage, isFinished, isTestPopupOpen } = useAppSelector(({ typingTest }) => typingTest);
  const [id, setId] = useState(uniqid());
  const [isCommandLineOpen, setIsCommandLineOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState('0');
  const testId = `${mode}-${mode === 'time' ? time : mode === 'words' ? words : ''}-${language}-${id}`;
  const chooseRandomTheme = async () => {
    if (randomTheme === 'off') return;
    let filteredThemes = themes;
    if (randomTheme === 'light' || randomTheme === 'dark') {
      filteredThemes = themes.filter((t) => t.mode === randomTheme && t.name !== themeName);
    }
    const newTheme = filteredThemes[Math.floor(Math.random() * filteredThemes.length)];
    dispatch(setThemeName(newTheme.name));
  };
  const restartTest = () => {
    setId(uniqid());
    chooseRandomTheme();
    dispatch(setIsFinished(false));
  };
  const toggleCommandLine = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsCommandLineOpen(!isCommandLineOpen);
      dispatch(setIsTestPopupOpen(false));
    }
  };
  const handleTab = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      restartTest();
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'time') {
      dispatch(setTime(+customAmount));
    } else {
      dispatch(setWords(+customAmount));
    }
    dispatch(setIsTestPopupOpen(false));
  };

  useEventListener(
    !isCommandLineOpen && !isTestPopupOpen ? window : null,
    'keydown',
    handleTab,
  );
  useEventListener(window, 'keydown', toggleCommandLine);
  useEffect(() => {
    dispatch(setThemeName(themeName));
  }, [dispatch, themeName]);
  useEffect(() => {
    (async () => {
      dispatch(setTestLanguage(await getLanguage(language)));
    })();
  }, [dispatch, language]);
  useEffect(() => {
    setCustomAmount(`${mode === 'time' ? time : words}`);
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
              <TestStats />
              <TypingTest isCommandLineOpen={isCommandLineOpen} />
              <Keymap />
            </Styled.Wrapper>
        }
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {isCommandLineOpen && (
          <CommandLine
            key="command-line"
            close={() => setIsCommandLineOpen(false)}
          />
        )}
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
                  onChange={({ target: { value } }) => setCustomAmount(value)}
                  autoFocus
                />
                You can start an infinite test by inputting 0.
                To stop the test, use shift + enter.
                <Button type="submit">ok</Button>
              </form>
            </Styled.CustomConfig>
          </Popup>
        )}
      </AnimatePresence>
    </Styled.Home>
  );
}

const languageURL = (lang: string) => `https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/${lang}.json`;
const getLanguage = async (language: string = languages[0]) => {
  const reponse = await fetch(languageURL(language));
  const { name, words } = await reponse.json();
  return { name, words };
};
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
