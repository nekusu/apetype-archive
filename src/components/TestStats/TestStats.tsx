import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { decrementTimer } from '../TypingTest/TypingTest.slice';
import Styled from './TestStats.styles';

function TestStats() {
  const dispatch = useAppDispatch();
  const { characters, errors, wpm, timer, isRunning } = useAppSelector(({ typingTest }) => typingTest);
  const accuracy = Math.floor((1 - errors / characters) * 100);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [dispatch, isRunning]);

  return (
    <Styled.Wrapper>
      <AnimatePresence>
        {isRunning && (
          <Styled.TestStats>
            <div>{timer}</div>
            <div>{accuracy}%</div>
            <div>{wpm}</div>
          </Styled.TestStats>
        )}
      </AnimatePresence>
    </Styled.Wrapper>
  );
}

export default TestStats;
