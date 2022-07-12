import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { formatDuration } from 'date-fns';
import uniqid from 'uniqid';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Keymap, TestResults, TestStats, TypingTest } from '../../components';
import { Button, Input, Loading, Popup } from '../../components/ui';
import { setTheme, setTime, setWords } from '../../slices/config';
import { setTestLanguage, setIsFinished, setIsTestPopupOpen } from '../../slices/typingTest';
import themes from '../../themes/_list';
import languages from '../../languages/_list';
import Styled from './Home.styles';

function Home() {
  const dispatch = useAppDispatch();
  const {
    theme,
    randomTheme,
    mode,
    time,
    words,
    language,
  } = useAppSelector(({ config }) => config);
  const { testLanguage, isFinished, isTestPopupOpen } = useAppSelector(({ typingTest }) => typingTest);
  const [id, setId] = useState(uniqid());
  const [testAmount, setTestAmount] = useState('0');
  const testId = `${mode}-${mode === 'time' ? time : mode === 'words' ? words : ''}-${language}-${id}`;
  const chooseRandomTheme = useCallback(async () => {
    if (randomTheme === 'off') return;
    let filteredThemes = themes;
    if (randomTheme === 'light' || randomTheme === 'dark') {
      filteredThemes = themes.filter((t) => t.mode === randomTheme && t.name !== theme.name);
    }
    const newTheme = filteredThemes[Math.floor(Math.random() * filteredThemes.length)];
    const colors = (await import(`../../themes/${newTheme.name}.ts`)).default;
    dispatch(setTheme({
      name: newTheme.name,
      mode: newTheme.mode,
      colors,
    }));
  }, [dispatch, theme, randomTheme]);
  const restartTest = useCallback(() => {
    setId(uniqid());
    chooseRandomTheme();
    dispatch(setIsFinished(false));
  }, [chooseRandomTheme, dispatch]);
  const handleTab = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      restartTest();
    }
  }, [restartTest]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'time') {
      dispatch(setTime(+testAmount));
    } else {
      dispatch(setWords(+testAmount));
    }
    dispatch(setIsTestPopupOpen(false));
  };

  useEffect(() => {
    (async () => {
      dispatch(setTestLanguage(await getLanguage(language)));
    })();
  }, [dispatch, language]);
  useEffect(() => {
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [handleTab]);
  useEffect(() => {
    setTestAmount(`${mode === 'time' ? time : words}`);
    dispatch(setIsFinished(false));
  }, [dispatch, mode, time, words]);

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
              <TypingTest />
              <Keymap />
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
