import * as React from 'react';
import { Link } from 'react-router-dom';
import { formatEventDate } from '../utils/dates';

const API_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

// Maps a Ticketmaster API event to the shape used by the rest of the app.
export function toEventItem(event) {
  const venue = event._embedded && event._embedded.venues && event._embedded.venues[0];
  const images = event.images || [];
  const image = images[2] || images[0];

  return {
    ticketMasterId: event.id,
    date: event.dates.start.localDate,
    eventName: event.name,
    image: image ? image.url : '',
    isGoing: false,
    locationCity: venue && venue.city ? venue.city.name : '',
    locationCountry: venue && venue.country ? venue.country.name : '',
    ...(venue && venue.state ? { locationState: venue.state.name } : {}),
  };
}

export class NearbyEvents extends React.Component {
  state = {
    events: [],
    searchInput: '',
    searchQuery: '',
    message: null,
    loading: false,
  };

  getEvents = async (searchParam) => {
    this.setState({ loading: true, message: null });
    const url = `${API_URL}?${searchParam}&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Ticketmaster responded with ${response.status}`);
      const data = await response.json();
      const results = (data._embedded && data._embedded.events) || [];

      const events = results
        .map(toEventItem)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      this.setState({
        events,
        loading: false,
        message: events.length === 0 ? 'No events found. Try a different search.' : null,
      });
    } catch (error) {
      console.error('Event search failed', error);
      this.setState({ events: [], loading: false, message: 'Something went wrong searching for events. Please try again.' });
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { searchQuery, searchInput } = this.state;
    const term = searchInput.trim();

    if (!searchQuery) {
      this.setState({ message: 'Please choose ZIP or Keyword from the dropdown.' });
    } else if (!term) {
      this.setState({ message: 'Please enter a search term.' });
    } else {
      const param = searchQuery === 'ZIP' ? 'postalCode' : 'keyword';
      this.getEvents(`${param}=${encodeURIComponent(term)}`);
    }
  };

  render() {
    const { events, searchInput, searchQuery, message, loading } = this.state;

    return (
      <div>
        <h4>Nearby Events</h4>
        <form className='input-group' onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            type='search'
            name='searchInput'
            id='searchInput'
            className='form-control'
            placeholder='Search'
            aria-label='Search term'
            value={searchInput}
          />
          <select
            onChange={this.onChange}
            name='searchQuery'
            className='form-control form-select'
            aria-label='Search by'
            value={searchQuery}
          >
            <option value=''>Search by...</option>
            <option value='ZIP'>ZIP</option>
            <option value='Keyword'>Keyword</option>
          </select>
          <button type='submit' className='btn btn-primary' aria-label='Search' disabled={loading}>
            <i className='fas fa-search'></i>
          </button>
        </form>

        {message && <p className='mt-3' role='status'>{message}</p>}

        <div className='container'>
          {events.map((eventItem) => (
            <div key={eventItem.ticketMasterId} className='card overflow-auto'>
              <Link to={{ pathname: `/event/${eventItem.ticketMasterId}`, state: { eventItem } }}>
                {eventItem.image && (
                  <img className='card-img-top' src={eventItem.image} alt={eventItem.eventName} />
                )}
                <div className='card-body'>
                  <h5 className='card-title'>{eventItem.eventName}</h5>
                  <p className='card-text'>{formatEventDate(eventItem.date)}</p>
                  <p className='card-text'>
                    {eventItem.locationCity}, {eventItem.locationState || eventItem.locationCountry}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
