import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    text-decoration: none;
    transition-property: none;
    transition-duration: 0.25s;
  }
`;

const App = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${p => p.theme.fontFamily || 'sans-serif'};
  background-color: ${p => p.theme.bg};
  transition-property: background-color;
`;

const Content = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const Styled = {
  App,
  Content,
};

export { GlobalStyle, Styled as default };
