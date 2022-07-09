import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { formatDuration } from 'date-fns';
import uniqid from 'uniqid';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Keymap, TestResults, TestStats, TypingTest } from '../../components';
import { Button, Input, Popup } from '../../components/ui';
import { setTheme, setTime, setWords } from '../../slices/config';
import { setIsFinished, setIsTestPopupOpen } from '../../slices/typingTest';
import themes from '../../themes/_list';
import Styled from './Home.styles';

function Home() {
  const dispatch = useAppDispatch();
  const { theme, randomTheme, mode, time, words } = useAppSelector(({ config }) => config);
  const { isFinished, isTestPopupOpen } = useAppSelector(({ typingTest }) => typingTest);
  const [id, setId] = useState(uniqid());
  const [testAmount, setTestAmount] = useState('0');
  const testId = `${mode}-${mode === 'time' ? time : mode === 'words' ? words : ''}-${id}`;
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

  let durationPreview = '';
  if (!+testAmount) {
    durationPreview = 'Infinite test';
  } else if (+testAmount < 0) {
    durationPreview = 'Error: invalid value';
  } else if (+testAmount > 3600) {
    durationPreview = 'Error: too long';
  } else {
    const date = new Date(+testAmount * 1000);
    durationPreview = `Total time: ${formatDuration({
      hours: date.getUTCHours(),
      minutes: date.getUTCMinutes(),
      seconds: date.getUTCSeconds(),
    })}`;
  }

  useEffect(() => {
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [handleTab]);
  useEffect(() => {
    setTestAmount(`${mode === 'time' ? time : words}`);
  }, [mode, time, words]);
  useEffect(() => {
    dispatch(setIsFinished(false));
  }, [dispatch, mode, time, words]);

  return (
    <Styled.Home>
      <AnimatePresence exitBeforeEnter>
        {isFinished
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
          <Popup
            title={mode === 'time' ? 'Test duration' : 'Word amount'}
            closePopup={() => dispatch(setIsTestPopupOpen(false))}
          >
            {mode === 'time' && durationPreview}
            <Styled.Form onSubmit={handleSubmit}>
              <Input
                type="number"
                min="0"
                max={mode === 'time' ? '3600' : '5000'}
                value={testAmount}
                onChange={({ target: { value } }) => setTestAmount(value)}
              />
              <div>
                You can start an infinite test by inputting 0.
                To stop the test, use shift + enter.
              </div>
              <Button type="submit">ok</Button>
            </Styled.Form>
          </Popup>
        )}
      </AnimatePresence>
    </Styled.Home>
  );
}

export default Home;
