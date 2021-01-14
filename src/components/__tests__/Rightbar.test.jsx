import React from 'react';
import { cleanup, fireEvent, waitForElement, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { customRender } from '../../customRender';
import Topbar from '../Topbar';
import { Rightbar } from '../Rightbar';

beforeAll(() => {
  delete window.location;
  window.location = { replace: jest.fn() };
});

afterAll(() => {
  window.location = location;
});

test('renders component', async () => {
  const addItem = jest.fn();
  customRender(<Rightbar handrleTransfer={() => {}} />);
  expect(screen.getByText(/zapisz/i)).toBeInTheDocument();
});

test('component handles button click', async () => {
  customRender(<Rightbar />);
  fireEvent.click(screen.getByText(/zapisz/i));
//   await waitFor(() => {
//     expect(screen.getByText(/zapisywanie planu nie powiodło się/i)).toBeInTheDocument();
//   });
});
