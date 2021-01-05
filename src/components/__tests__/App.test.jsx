import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { customRender } from '../../customRender';
import { App } from '../App';

beforeAll(() => {
  delete window.location;
  window.location = { replace: jest.fn() };
});

afterAll(() => {
  window.location = location;
});

afterEach(cleanup);

test('renders application', async () => {
  customRender(<App />);
  expect(screen.getByText(/plan na plan/i)).toBeInTheDocument();
});
