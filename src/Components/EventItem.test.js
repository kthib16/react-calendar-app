import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import EventItem from './EventItem';

const user = { email: 'me@example.com' };

const events = [
  { id: 'b', eventName: 'Later show', date: '2026-12-20', friendsGoing: [{ userName: 'me@example.com' }] },
  { id: 'a', eventName: 'Sooner show', date: '2026-11-10', friendsGoing: [{ userName: 'someone@else.com' }, { userName: 'me@example.com' }] },
  { id: 'c', eventName: 'Not mine', date: '2026-11-15', friendsGoing: [{ userName: 'someone@else.com' }] },
];

const renderItems = (props = {}) =>
  render(
    <MemoryRouter>
      <EventItem events={events} user={user} removeEvent={jest.fn()} {...props} />
    </MemoryRouter>
  );

test("lists only the user's events, soonest first", () => {
  renderItems();
  const items = screen.getAllByRole('listitem').map((item) => item.textContent);
  expect(items).toEqual(['Sooner show', 'Later show']);
});

test('does not mutate the events it was given', () => {
  const copy = [...events];
  renderItems();
  expect(events).toEqual(copy);
});

test('shows an empty state when the user has no events', () => {
  renderItems({ events: [events[2]] });
  expect(screen.getByText(/no upcoming events/i)).toBeInTheDocument();
});

test('calls removeEvent with the event id', () => {
  const removeEvent = jest.fn();
  renderItems({ removeEvent });
  userEvent.click(screen.getByRole('button', { name: 'Remove Sooner show' }));
  expect(removeEvent).toHaveBeenCalledWith('a');
});
