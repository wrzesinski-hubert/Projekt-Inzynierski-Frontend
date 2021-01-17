import React from 'react';
import { cleanup, fireEvent, waitForElement, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { customRender } from '../../customRender';
import Topbar from '../Topbar';
import { Statistics } from '../Statistics';

beforeAll(() => {
  delete window.location;
  window.location = { replace: jest.fn() };
});

afterAll(() => {
  window.location = location;
});

test('renders component', async () => {
    customRender(<Statistics/>);
    expect(screen.getByText(/Studentów bez zaakceptowanego pełengo planu/i)).toBeInTheDocument();
  });

  test('renders component', async () => {
    customRender(<Statistics/>);
    expect(screen.getByText(/Zapisanych sutdentów do grup/i)).toBeInTheDocument();
  });
    