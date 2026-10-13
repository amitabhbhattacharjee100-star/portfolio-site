import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Contact from './Contact.jsx';

afterEach(() => vi.unstubAllGlobals());

async function fillAndSubmitForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/first name/i), 'Test');
  await user.type(screen.getByLabelText(/last name/i), 'Student');
  await user.type(screen.getByLabelText(/contact number/i), '4165550100');
  await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
  await user.type(screen.getByLabelText(/message/i), 'This is a test message.');
  await user.click(screen.getByRole('button', { name: /send message/i }));
}

describe('Contact page', () => {
  it('posts contact details to the API and shows success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true, status: 201, json: async () => ({ ok: true }),
    }));
    render(<MemoryRouter><Contact /></MemoryRouter>);
    await fillAndSubmitForm();
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/thanks, test/i));
    expect(fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }));
  });

  it('shows an error if the contact API is not configured', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 503,
      json: async () => ({ error: 'The contact service is not configured yet. Please try again later.' }),
    }));
    render(<MemoryRouter><Contact /></MemoryRouter>);
    await fillAndSubmitForm();
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/not configured yet/i));
  });
});
