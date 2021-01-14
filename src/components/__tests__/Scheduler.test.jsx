import React from 'react';
import { cleanup, fireEvent, waitForElement, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { customRender,customRenderCAS } from '../../customRender';
import {Scheduler} from '../Scheduler';

beforeAll(() => {
  delete window.location;
  window.location = { replace: jest.fn() };
});

afterAll(() => {
  window.location = location;
});

test('renders component', async () => {
    const addItem = jest.fn();
    customRender(<Scheduler/>);
    expect(screen.getByText(/Poniedziałek/i)).toBeInTheDocument();
  });