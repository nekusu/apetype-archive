import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import uniqid from 'uniqid';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TestStats, TypingTest } from '../../components';
import { setTheme } from '../../app/config.slice';
import themes from '../../themes/_list';
import Styled from './Home.styles';

function Home() {
  const dispatch = useAppDispatch();
  const { randomTheme, mode, time } = useAppSelector(({ config }) => config);
  const { seconds } = useAppSelector(({ testStats }) => testStats);
  const [testId, setTestId] = useState(uniqid());
  const chooseRandomTheme = useCallback(async () => {
    if (randomTheme === 'off') return;
    let filteredThemes = themes;
    if (randomTheme === 'light' || randomTheme === 'dark') {
      filteredThemes = themes.filter((theme) => theme.mode === randomTheme);
    }
    const newTheme = filteredThemes[Math.floor(Math.random() * filteredThemes.length)];
    dispatch(setTheme((await import(`../../themes/${newTheme.name}.ts`)).default));
  }, [dispatch, randomTheme]);
  const restartTest = useCallback(() => {
    setTestId(uniqid());
    chooseRandomTheme();
  }, [chooseRandomTheme]);
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      restartTest();
    }
  }, [restartTest]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    chooseRandomTheme();
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chooseRandomTheme, handleKeyDown]);
  useEffect(() => {
    if (!seconds) {
      restartTest();
    }
  }, [restartTest, seconds]);

  return (
    <Styled.Home>
      <TestStats />
      <AnimatePresence exitBeforeEnter>
        <TypingTest key={`${mode}-${time}-${testId}`} />
      </AnimatePresence>
    </Styled.Home>
  );
}

export default Home;
