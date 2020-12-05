import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { CASProvider } from './contexts/CASProvider';
import { CoursesProvider } from './contexts/CoursesProvider';
import { UsersProvider } from './contexts/UsersProvider';
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
        <UsersProvider>
          <CoursesProvider>
            <GlobalStyles />
            <App />
          </CoursesProvider>
        </UsersProvider>
      </CASProvider>
    </SnackbarProvider>
  </>,
  document.getElementById('root'),
);
