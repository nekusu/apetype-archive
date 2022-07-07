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
  const { theme, randomTheme, mode, time } = useAppSelector(({ config }) => config);
  const [id, setId] = useState(uniqid());
  const testId = `${mode}-${time}-${id}`;
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
  }, [chooseRandomTheme]);
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      restartTest();
    }
  }, [restartTest]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Styled.Home>
      <TestStats />
      <AnimatePresence exitBeforeEnter>
        <TypingTest key={testId} />
      </AnimatePresence>
    </Styled.Home>
  );
}

export default Home;
