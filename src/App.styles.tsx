import styled, { createGlobalStyle } from 'styled-components';

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

const App = styled.div`
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

const Styled = {
  App,
  Content,
};

export { GlobalStyle, Styled as default };
