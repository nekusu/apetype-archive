import { useEffect } from 'react';
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
  const accuracy = (1 - errorCount / characterCount) * 100;
  const intAccuracy = Math.floor(accuracy);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      if (mode === 'time') {
        dispatch(setTimer(time));
      }
      interval = setInterval(() => {
        dispatch(updateStats());
        if (mode === 'time') {
          dispatch(decrementTimer());
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [dispatch, mode, time, isRunning]);
  useEffect(() => {
    if (
      mode === 'time' && timer <= 0 ||
      mode === 'words' && wordIndex >= words
    ) {
      if (mode !== 'time') {
        dispatch(updateStats());
      }
      dispatch(endTest());
    }
  }, [dispatch, mode, words, timer, wordIndex]);

  return (
    <Styled.Wrapper>
      <AnimatePresence>
        {(isRunning || isFinished) && (
          <Styled.TestStats>
            {mode === 'time'
              ? <div>timer</div>
              : mode === 'words'
                ? <div>{wordIndex}/{words}</div>
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
