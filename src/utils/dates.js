const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Parses an event date string ("YYYY-MM-DD" or the unpadded "YYYY-M-D" that older
 * events were saved with) into a local Date at midnight. Returns null if invalid.
 */
export function parseEventDate(value) {
  if (typeof value !== 'string') return null;
  const parts = value.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  const valid =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return valid ? date : null;
}

/** Formats a Date as the "YYYY-MM-DD" string stored with each event. */
export function toEventDateString(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Formats an event date string for display, e.g. "November 5, 2026". */
export function formatEventDate(value) {
  const date = parseEventDate(value);
  if (!date) return '';
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** True if the event is today or later. */
export function isUpcoming(value, now = new Date()) {
  const date = parseEventDate(value);
  return date !== null && date >= startOfDay(now);
}

/** True if the event is today or within the next `days` days. */
export function isWithinDays(value, days = 7, now = new Date()) {
  const date = parseEventDate(value);
  if (date === null) return false;
  const diff = Math.round((date - startOfDay(now)) / MS_PER_DAY);
  return diff >= 0 && diff <= days;
}
