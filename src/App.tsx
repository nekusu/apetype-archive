import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Header } from './components';
import themes from './themes/_list';
import Styled, { GlobalStyle } from './App.styles';

function App() {
  const [theme, setTheme] = useState({});

  useEffect(() => {
    (async () => {
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      setTheme((await import(`./themes/${randomTheme.name}.ts`)).default);
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Styled.App>
        <Styled.Content>
          <Header />
        </Styled.Content>
      </Styled.App>
    </ThemeProvider>
  );
}

export default App;
