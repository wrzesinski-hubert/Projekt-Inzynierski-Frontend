import React from 'react';
import { cleanup, fireEvent, waitForElement, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { customRender,customRenderCAS } from '../../customRender';
import {SelectMenu} from '../SelectMenu';
import { Select } from '@material-ui/core';

beforeAll(() => {
  delete window.location;
  window.location = { replace: jest.fn() };
});

afterAll(() => {
  window.location = location;
});

test('not render component for student', async () => {
  customRender(<SelectMenu/>);
  expect(screen.queryByText(/przedmioty/i)).not.toBeInTheDocument();
});

test('not render component for deanery', async () => {
  customRenderCAS(<SelectMenu/>);
  expect(screen.queryByText(/przedmioty/i)).not.toBeInTheDocument();
});