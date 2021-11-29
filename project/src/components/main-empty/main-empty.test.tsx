import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';
import { DefaultCity } from '../../const';

describe('Component: MainEmpty', () => {
  it('should render MainEmpty', () => {
    render(<MainEmpty city={DefaultCity} />);
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
