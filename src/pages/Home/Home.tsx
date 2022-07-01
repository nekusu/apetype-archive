import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setWords } from '../../components/TypingTest/TypingTest.slice';
import { TypingTest } from '../../components';
import Styled from './Home.styles';

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setWords([]));
      return;
    };
  }, [dispatch]);

  return (
    <Styled.Home>
      <TypingTest />
    </Styled.Home>
  );
}

export default Home;
