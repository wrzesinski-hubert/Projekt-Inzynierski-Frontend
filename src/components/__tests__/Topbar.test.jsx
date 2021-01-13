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
  const input = getByPlaceholderText('Wyszukaj przedmioty...');
  // fireEvent.change(input, { target: { value: '122' } });
  // console.log(debug());
  // const textNode = await waitForElement(() => getByText('asdasdsa'));
  // console.log(debug());
  expect(input).toBeInTheDocument();
});

test('input should display changed value', async () => {
  const { getByPlaceholderText, getByText, debug } = customRender(<Topbar handleTransfer={() => {}} />);
  const input = getByPlaceholderText('Wyszukaj przedmioty...');
  fireEvent.change(input, { target: { value: '122' } });
  // console.log(debug());
  // console.log(debug());
  expect(input.value).toBe("122");
});
