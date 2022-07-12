/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import useEventListener from 'use-typed-event-listener';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { decrementTimer, endTest, setTimer, updateStats } from '../../slices/typingTest';
import { accuracy as acc } from '../../utils';
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
  const accuracy = acc(errorCount, characterCount);
  const intAccuracy = Math.floor(accuracy) || 0;
  const handleShiftEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      dispatch(updateStats(performance.now()));
      dispatch(endTest());
    }
  };

  useEventListener(
    isRunning && (mode === 'zen' || !time || !words) ? window : null,
    'keydown',
    handleShiftEnter,
  );
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
  }, [isRunning]);
  useEffect(() => {
    if (mode === 'time' && time > 0 && timer <= 0 ||
      mode === 'words' && words > 0 && wordIndex >= words) {
      if (mode !== 'time') {
        dispatch(updateStats(performance.now()));
      }
      dispatch(endTest());
    }
  }, [timer, wordIndex]);

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
