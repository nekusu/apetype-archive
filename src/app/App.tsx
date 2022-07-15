import { useCallback, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import useEventListener from 'use-typed-event-listener';
import { useAppDispatch, useAppSelector } from './hooks';
import { setTheme, setCapsLock, setCommandLine } from '../slices/app';
import { setThemeName } from '../slices/config';
import { setTestLanguage, setIsTestPopupOpen } from '../slices/typingTest';
import { CommandLine, Header, Footer } from '../components';
import { Home, Settings } from '../pages';
import themes from '../themes/_list';
import languages from '../languages/_list';
import Styled, { GlobalStyle } from './App.styles';

function App() {
  const dispatch = useAppDispatch();
  const { theme, commandLine } = useAppSelector(({ app }) => app);
  const config = useAppSelector(({ config }) => config);
  const { language, fontFamily, themeName, randomTheme } = config;
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
  const toggleCommandLine = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      dispatch(setCommandLine({ isOpen: !commandLine.isOpen }));
      dispatch(setIsTestPopupOpen(false));
    }
  };
  const handleCapsLock = (e: KeyboardEvent) => {
    dispatch(setCapsLock(e.getModifierState('CapsLock')));
  };

  useEffect(() => {
    localStorage.setItem('config', JSON.stringify(config));
  }, [config]);
  useEffect(() => {
    (async () => {
      dispatch(setTestLanguage(await getLanguage(language)));
    })();
  }, [dispatch, language]);
  useEffect(() => {
    if (!themeName) {
      setRandomTheme();
    } else {
      (async () => {
        dispatch(setTheme((await import(`../themes/${themeName}.ts`)).default));
      })();
    }
  }, [dispatch, themeName, setRandomTheme]);
  useEventListener(window, 'keydown', toggleCommandLine);
  useEventListener(window, 'keyup', handleCapsLock);

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
                  <Route path="/settings" element={<Settings />} />
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

const languageURL = (lang: string) => `https://raw.githubusercontent.com/monkeytypegame/
monkeytype/master/frontend/static/languages/${lang.replace(/\s/g, '_')}.json`;
const getLanguage = async (language: string = languages[0]) => {
  const reponse = await fetch(languageURL(language));
  const { words } = await reponse.json();
  return { name: language, words };
};
export default App;
