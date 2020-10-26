import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { CASProvider } from './contexts/CASProvider';
import { CoursesProvider } from './contexts/CoursesProvider';
import { GlobalStyles } from './styles/GlobalStyles';

ReactDOM.render(
  <>
    <CASProvider>
      <CoursesProvider>
        <GlobalStyles />
        <App />
      </CoursesProvider>
    </CASProvider>
  </>,
  document.getElementById('root'),
);
