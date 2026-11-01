import { render, screen } from '@testing-library/react';
import UpcomingEvents from './UpcomingEvents';

test('uses the singular for one event', () => {
  render(<UpcomingEvents upcomingEvents={1} />);
  expect(screen.getByRole('alert')).toHaveTextContent('You have 1 upcoming event');
  expect(screen.getByRole('alert')).not.toHaveTextContent('events');
});

test('uses the plural for several events', () => {
  render(<UpcomingEvents upcomingEvents={3} />);
  expect(screen.getByRole('alert')).toHaveTextContent('You have 3 upcoming events');
});
