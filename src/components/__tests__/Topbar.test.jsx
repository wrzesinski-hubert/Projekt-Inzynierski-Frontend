import React from 'react';
import { cleanup, fireEvent, waitForElement, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { customRender } from '../../customRender';
import Topbar from '../Topbar';

beforeAll(() => {
  delete window.location;
  window.location = { replace: jest.fn() };
});

afterAll(() => {
  window.location = location;
});

test('renders component', async () => {
  customRender(<Topbar handrleTransfer={() => {}} />);
  expect(screen.getByText(/plan na plan/i)).toBeInTheDocument();
});

test('input should display default placeholder for student', async () => {
  const { getByPlaceholderText, getByText, debug } = customRender(<Topbar handleTransfer={() => {}} />);
  setTimeout(()=>{const input = getByPlaceholderText('Wyszukaj przedmioty...');
  expect(input).toBeInTheDocument();},2000);
});

test('input should display changed value', async () => {
  const { getByPlaceholderText, getByText, debug } = customRender(<Topbar handleTransfer={() => {}} />);
  setTimeout(()=>{  const input = getByPlaceholderText('Wyszukaj przedmioty...');
  fireEvent.change(input, { target: { value: '122' } });expect(input.value).toBe("122");},2000);  
});
