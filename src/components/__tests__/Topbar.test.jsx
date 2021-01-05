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

// test('calculate results after user types value', async () => {
//   const { getByLabelText, getByText, debug } = customRender(<Topbar handleTransfer={() => {}} />);
//   const input = getByLabelText('xd');
//   fireEvent.change(input, { target: { value: '122' } });
//   console.log(debug());
//   const textNode = await waitForElement(() => getByText('asdasdsa'));
//   console.log(debug());
//   expect(textNode).toBeInTheDocument();
// });
