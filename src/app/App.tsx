import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { useAppDispatch, useAppSelector } from './hooks';
import { setTheme } from '../slices/app';
import { CommandLine, Header, Footer } from '../components';
import { Home } from '../pages';
import Styled, { GlobalStyle } from './App.styles';

function App() {
  const dispatch = useAppDispatch();
  const { theme, commandLine } = useAppSelector(({ app }) => app);
  const { fontFamily, themeName } = useAppSelector(({ config }) => config);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      dispatch(setTheme((await import(`../themes/${themeName}.ts`)).default));
    })();
  }, [dispatch, themeName]);

  return (
    <ThemeProvider theme={{ ...theme, fontFamily }}>
      <LazyMotion features={domAnimation}>
        <MotionConfig transition={{ opacity: { duration: 0.25 } }}>
          <GlobalStyle />
          <Styled.App>
            <Styled.Content>
              <AnimatePresence>
                {commandLine.isOpen && <CommandLine />}
              </AnimatePresence>
              <Header />
              <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                </Routes>
              </AnimatePresence>
              <Footer />
            </Styled.Content>
          </Styled.App>
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}

export default App;
