import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { Header } from './components';
import { Home } from './pages';
import themes from './themes/_list';
import Styled, { GlobalStyle } from './App.styles';

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState({});

  useEffect(() => {
    (async () => {
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      setTheme((await import(`./themes/${randomTheme.name}.ts`)).default);
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LazyMotion features={domAnimation}>
        <MotionConfig transition={{ opacity: { duration: 0.25 } }}>
          <GlobalStyle />
          <Styled.App>
            <Styled.Content>
              <Header />
              <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                </Routes>
              </AnimatePresence>
            </Styled.Content>
          </Styled.App>
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}

export default App;
