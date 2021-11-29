import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Component: Loading', () => {
  it('should render Loading', () => {
    render(<Loading />);
    expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
  });
});
