import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { CASProvider } from './contexts/CASProvider';
import { CoursesProvider } from './contexts/CoursesProvider';
import { StudentsProvider } from './contexts/StudentsProvider';
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
        <StudentsProvider>
          <CoursesProvider>
            <GlobalStyles />
            <App />
          </CoursesProvider>
        </StudentsProvider>
      </CASProvider>
    </SnackbarProvider>
  </>,
  document.getElementById('root'),
);
