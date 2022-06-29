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

const StyledApp = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.25s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 32px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Content />
      </StyledApp>
    </>
  );
}

export default App;
