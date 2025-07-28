import { render, screen } from '@testing-library/react';
import { Avatar, AvatarFallback } from './Avatar.tsx';
import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';

describe('<Avatar />', () => {
  it('should render', () => {
    render(<Avatar />);
  });

  it('should render children inside <Avatar />', () => {
    render(<Avatar>JD</Avatar>);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});

describe('<AvatarFallback />', () => {
  it('should render children inside <AvatarFallback />', () => {
    render(<AvatarFallback>EO</AvatarFallback>);
  });
});
