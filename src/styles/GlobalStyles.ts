import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    line-height: 24px;
    font-family: 'B612', sans-serif;
  }

  body::-webkit-scrollbar {
    display: none;
  }
`;
