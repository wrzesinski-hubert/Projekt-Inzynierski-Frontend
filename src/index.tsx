import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { CASProvider } from './contexts/CASProvider';
import { CoursesProvider } from './contexts/CoursesProvider';
import { GlobalStyles } from './styles/GlobalStyles';

ReactDOM.render(
  <>
    <CoursesProvider>
      <CASProvider>
        <GlobalStyles />
        <App />
      </CASProvider>
    </CoursesProvider>
  </>,
  document.getElementById('root'),
);
