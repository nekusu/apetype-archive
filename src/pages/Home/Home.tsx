import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setWords } from '../../components/TypingTest/TypingTest.slice';
import { TestStats, TypingTest } from '../../components';
import Styled from './Home.styles';

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setWords([]));
    };
  }, [dispatch]);

  return (
    <Styled.Home>
      <TestStats />
      <TypingTest />
    </Styled.Home>
  );
}

export default Home;
