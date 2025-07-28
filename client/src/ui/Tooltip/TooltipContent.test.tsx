import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';
import { render } from '@testing-library/react';
import TooltipContent from './TooltipContent.tsx';

describe('<TooltipContent />', () => {
  it('should throw and error if not used inside the tooltip context', () => {
    expect(() =>
      render(<TooltipContent position="top">Content text</TooltipContent>),
    ).toThrow('TooltipContext should be used within the Tooltip');
  });
});
