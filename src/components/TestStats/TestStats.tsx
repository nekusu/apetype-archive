import { useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { decrementTimer, endTest, setTimer, updateStats } from '../../slices/typingTest';
import Styled from './TestStats.styles';

function TestStats() {
  const dispatch = useAppDispatch();
  const { mode, time, words } = useAppSelector(({ config }) => config);
  const {
    wordIndex,
    characterCount,
    errorCount,
    wpm,
    timer,
    isRunning,
    isFinished,
  } = useAppSelector(({ typingTest }) => typingTest);
  const intWpm = Math.floor(wpm);
  const absTimer = Math.abs(timer);
  const accuracy = (1 - errorCount / characterCount) * 100;
  const intAccuracy = Math.floor(accuracy) || 0;
  const handleShiftEnter = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      dispatch(updateStats(performance.now()));
      dispatch(endTest());
    }
  }, [dispatch]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      if (mode === 'time') {
        dispatch(setTimer(time));
      }
      interval = setInterval(() => {
        dispatch(updateStats(performance.now()));
        if (mode === 'time') {
          dispatch(decrementTimer());
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [dispatch, mode, time, isRunning]);
  useEffect(() => {
    if (mode === 'time' && time > 0 && timer <= 0 ||
      mode === 'words' && words > 0 && wordIndex >= words) {
      if (mode !== 'time') {
        dispatch(updateStats(performance.now()));
      }
      dispatch(endTest());
    }
  }, [dispatch, mode, time, words, timer, wordIndex]);
  useEffect(() => {
    if (isRunning && (mode === 'zen' || !time || !words)) {
      window.addEventListener('keydown', handleShiftEnter);
    }
    return () => window.removeEventListener('keydown', handleShiftEnter);
  }, [mode, time, words, handleShiftEnter, isRunning]);

  return (
    <Styled.Wrapper>
      <AnimatePresence>
        {(isRunning || isFinished) && (
          <Styled.TestStats>
            {mode === 'time'
              ? <div>{absTimer}</div>
              : mode === 'words' || mode === 'zen'
                ? <div>
                  {wordIndex}
                  {mode !== 'zen' && words ? '/' + words : ''}
                </div>
                : null
            }
            <div>{intWpm}</div>
            <div>{intAccuracy}%</div>
          </Styled.TestStats>
        )}
      </AnimatePresence>
    </Styled.Wrapper>
  );
}

export default TestStats;
