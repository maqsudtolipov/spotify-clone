import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';
import TooltipTrigger from './TooltipTrigger.tsx';
import Tooltip from './Tooltip.tsx';
import TooltipContent from './TooltipContent.tsx';
import userEvent from '@testing-library/user-event';

describe('<Tooltip />', () => {
  it('should show and hide tooltip on hover', async () => {
    render(
      <Tooltip>
        <TooltipTrigger>
          <button>Toggle</button>
        </TooltipTrigger>
        <TooltipContent position="top">Toggle queue list</TooltipContent>
      </Tooltip>,
    );

    // getByText did not work
    const trigger = screen.getByRole('button');
    const content = screen.queryByText('Toggle queue list');

    // Initially not visible
    expect(content).not.toBeInTheDocument();

    // Hover on the text to show tooltip
    await userEvent.hover(trigger);
    expect(await screen.findByText('Toggle queue list')).toBeVisible();

    // Unhover to hide tooltip
    await userEvent.unhover(trigger);
    expect(screen.queryByText('Toggle queue')).not.toBeInTheDocument();
  });
});
