import { useEffect, useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Header } from './components';
import themes from './themes/_list';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    text-decoration: none;
  }
`;

const StyledApp = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${p => p.theme.bg};
  transition: background-color 0.25s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 32px;
`;

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
      <StyledApp>
        <Content>
          <Header />
        </Content>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
