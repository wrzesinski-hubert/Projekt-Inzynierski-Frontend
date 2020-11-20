import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { CASProvider } from './contexts/CASProvider';
import { CoursesProvider } from './contexts/CoursesProvider';
import { GlobalStyles } from './styles/GlobalStyles';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <CASProvider>
        <CoursesProvider>
          <GlobalStyles />
          <App />
        </CoursesProvider>
      </CASProvider>
    </SnackbarProvider>
  </>,
  document.getElementById('root'),
);
