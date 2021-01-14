import React from 'react';
import { render, screen } from '@testing-library/react';
import { CASProvider } from './contexts/CASProvider';
import { CoursesProvider } from './contexts/CoursesProvider';
import { StudentsProvider } from './contexts/StudentsProvider';
import { SnackbarProvider } from 'notistack';

export const customRender = (ui, CASValue = {}, studentsValue = {}, coursesValue = {}) => {
  return render(
    <SnackbarProvider>
      <CASProvider value={20}>
        <StudentsProvider value={50}>
          <CoursesProvider value={100}>{ui}</CoursesProvider>
        </StudentsProvider>
      </CASProvider>
    </SnackbarProvider>,
  );
};

export const customRenderCAS = (ui, CASValue = {}, studentsValue = {}, coursesValue = {}) => {

  const user={authorityRole: "DEANERY", email: "test@test.pl", id: "123"}

  return render(
    <SnackbarProvider>
      <CASProvider value={{user}}>
        <StudentsProvider value={50}>
          <CoursesProvider value={100}>{ui}</CoursesProvider>
        </StudentsProvider>
      </CASProvider>
    </SnackbarProvider>,
  );
};