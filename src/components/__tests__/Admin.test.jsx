import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { customRender } from '../../customRender';
import { Admin } from '../Admin';

beforeAll(() => {
  delete window.location;
  window.location = { replace: jest.fn() };
});

afterAll(() => {
  window.location = location;
});

test('renders component', async () => {
    const addItem = jest.fn();
    customRender(<Admin />);
    expect(screen.getByText(/Pokaż plan/i)).toBeInTheDocument();
  });