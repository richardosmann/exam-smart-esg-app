import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the Form component if needed
jest.mock('./component/pages/Form', () => ({
  Form: () => <div data-testid="form-component">Form Component</div>,
}));

describe('App Component', () => {
  it('renders the Form component', () => {
    render(<App />);
    const formElement = screen.getByTestId('form-component');
    expect(formElement).toBeInTheDocument();
  });
});
