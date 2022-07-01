import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setWords } from '../../components/TypingTest/TypingTest.slice';
import { TestStats, TypingTest } from '../../components';
import Styled from './Home.styles';

function Home() {
  const dispatch = useAppDispatch();
  const { mode, time } = useAppSelector(({ config }) => config);

  useEffect(() => {
    return () => {
      dispatch(setWords([]));
    };
  }, [dispatch]);

  return (
    <Styled.Home>
      <TestStats />
      <AnimatePresence exitBeforeEnter>
        <TypingTest key={`${mode}-${time}`} />
      </AnimatePresence>
    </Styled.Home>
  );
}

export default Home;
