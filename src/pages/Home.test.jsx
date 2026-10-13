import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home.jsx';

describe('Home page', () => {
  it('shows the mission statement and featured work section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /mission statement/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /a quick highlight reel/i })).toBeInTheDocument();
  });

  it('provides links to the About and Projects pages', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /meet me/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /see my work/i })).toHaveAttribute('href', '/projects');
  });
});
