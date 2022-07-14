import { useCallback, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { useAppDispatch, useAppSelector } from './hooks';
import { setTheme } from '../slices/app';
import { setThemeName } from '../slices/config';
import { CommandLine, Header, Footer } from '../components';
import { Home } from '../pages';
import themes from '../themes/_list';
import Styled, { GlobalStyle } from './App.styles';

function App() {
  const dispatch = useAppDispatch();
  const { theme, commandLine } = useAppSelector(({ app }) => app);
  const config = useAppSelector(({ config }) => config);
  const { fontFamily, themeName, randomTheme } = config;
  const location = useLocation();
  const setRandomTheme = useCallback(async () => {
    if (randomTheme === 'off') return;
    let filteredThemes = themes.filter((t) => t.name !== themeName);
    if (randomTheme === 'light' || randomTheme === 'dark') {
      filteredThemes = filteredThemes.filter((t) => t.mode === randomTheme);
    }
    const newTheme = filteredThemes[Math.floor(Math.random() * filteredThemes.length)];
    dispatch(setThemeName(newTheme.name));
  }, [dispatch, randomTheme, themeName]);

  useEffect(() => {
    localStorage.setItem('config', JSON.stringify(config));
  }, [config]);
  useEffect(() => {
    if (!themeName) {
      setRandomTheme();
    } else {
      (async () => {
        dispatch(setTheme((await import(`../themes/${themeName}.ts`)).default));
      })();
    }
  }, [dispatch, themeName, setRandomTheme]);

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
                  <Route path="/" element={<Home setRandomTheme={setRandomTheme} />} />
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
