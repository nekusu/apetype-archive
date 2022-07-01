import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setTimer, addSecond } from './TestStats.slice';
import Styled from './TestStats.styles';

function TestStats() {
  const dispatch = useAppDispatch();
  const { isRunning } = useAppSelector(({ typingTest }) => typingTest);
  const { seconds } = useAppSelector(({ testStats }) => testStats);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      dispatch(setTimer());
      interval = setInterval(() => {
        dispatch(addSecond());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [dispatch, isRunning]);

  return (
    <Styled.Wrapper>
      <AnimatePresence>
        {isRunning && (
          <Styled.TestStats>
            <div>{seconds}</div>
          </Styled.TestStats>
        )}
      </AnimatePresence>
    </Styled.Wrapper>
  );
}

export default TestStats;
