import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import { Header, ThemeProvider } from '../components';
import { Home } from '../pages';
import Styled, { GlobalStyle } from './App.styles';

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
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
