import { toEventItem } from './NearbyEvents';

const apiEvent = {
  id: 'tm123',
  name: 'Jazz Night',
  dates: { start: { localDate: '2026-11-20' } },
  images: [{ url: 'small.jpg' }, { url: 'medium.jpg' }, { url: 'large.jpg' }],
  _embedded: {
    venues: [{ city: { name: 'New Orleans' }, state: { name: 'Louisiana' }, country: { name: 'United States Of America' } }],
  },
};

describe('toEventItem', () => {
  it('maps a Ticketmaster event to the app shape', () => {
    expect(toEventItem(apiEvent)).toEqual({
      ticketMasterId: 'tm123',
      date: '2026-11-20',
      eventName: 'Jazz Night',
      image: 'large.jpg',
      isGoing: false,
      locationCity: 'New Orleans',
      locationCountry: 'United States Of America',
      locationState: 'Louisiana',
    });
  });

  it('copes with missing images and venue details', () => {
    const item = toEventItem({ id: 'x', name: 'Mystery', dates: { start: { localDate: '2026-11-21' } } });
    expect(item.image).toBe('');
    expect(item.locationCity).toBe('');
    expect(item).not.toHaveProperty('locationState');
  });
});
