import {
  formatEventDate,
  isUpcoming,
  isWithinDays,
  parseEventDate,
  toEventDateString,
} from './dates';

const NOW = new Date(2026, 10, 5, 15, 30); // Nov 5, 2026, 3:30 PM

describe('parseEventDate', () => {
  it('parses padded and unpadded dates', () => {
    expect(parseEventDate('2026-11-05')).toEqual(new Date(2026, 10, 5));
    expect(parseEventDate('2026-11-5')).toEqual(new Date(2026, 10, 5));
  });

  it('returns null for invalid input', () => {
    expect(parseEventDate('not-a-date')).toBeNull();
    expect(parseEventDate('2026-13-40')).toBeNull();
    expect(parseEventDate(undefined)).toBeNull();
  });
});

describe('toEventDateString', () => {
  it('zero-pads the month and day', () => {
    expect(toEventDateString(new Date(2026, 0, 3))).toBe('2026-01-03');
    expect(toEventDateString(new Date(2026, 10, 25))).toBe('2026-11-25');
  });
});

describe('formatEventDate', () => {
  it('formats a date for display', () => {
    expect(formatEventDate('2026-11-05')).toBe('November 5, 2026');
    expect(formatEventDate('2026-1-31')).toBe('January 31, 2026');
  });

  it('returns an empty string for invalid dates', () => {
    expect(formatEventDate('nope')).toBe('');
  });
});

describe('isUpcoming', () => {
  it('includes today and future dates', () => {
    expect(isUpcoming('2026-11-05', NOW)).toBe(true);
    expect(isUpcoming('2026-12-01', NOW)).toBe(true);
  });

  it('excludes past and invalid dates', () => {
    expect(isUpcoming('2026-11-04', NOW)).toBe(false);
    expect(isUpcoming('garbage', NOW)).toBe(false);
  });
});

describe('isWithinDays', () => {
  it('is true for events in the next seven days', () => {
    expect(isWithinDays('2026-11-05', 7, NOW)).toBe(true);
    expect(isWithinDays('2026-11-12', 7, NOW)).toBe(true);
  });

  it('is false for events further out or already past', () => {
    expect(isWithinDays('2026-11-13', 7, NOW)).toBe(false);
    expect(isWithinDays('2026-11-04', 7, NOW)).toBe(false);
  });
});
