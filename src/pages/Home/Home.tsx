import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import uniqid from 'uniqid';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Keymap, TestResults, TestStats, TypingTest } from '../../components';
import { Button } from '../../components/ui';
import { setTheme } from '../../slices/config';
import { setIsFinished } from '../../slices/typingTest';
import themes from '../../themes/_list';
import Styled from './Home.styles';

function Home() {
  const dispatch = useAppDispatch();
  const { theme, randomTheme, mode, time, words } = useAppSelector(({ config }) => config);
  const { isFinished } = useAppSelector(({ typingTest }) => typingTest);
  const [id, setId] = useState(uniqid());
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
    </Styled.Home>
  );
}

export default Home;
