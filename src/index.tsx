import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { CASProvider } from './contexts/CASProvider';
import { LecturesProvider } from './contexts/LecturesProvider';
import { GlobalStyles } from './styles/GlobalStyles';

ReactDOM.render(
  <>
    <LecturesProvider>
      <CASProvider>
        <GlobalStyles />
        <App />
      </CASProvider>
    </LecturesProvider>
  </>,
  document.getElementById('root'),
);
