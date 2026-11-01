import * as React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_AVATAR } from '../constants';
import { formatEventDate } from '../utils/dates';

export class EventDetails extends React.Component {
  state = {
    url: undefined,
    locationCity: undefined,
    locationState: undefined,
    isGoing: false,
    error: null,
  };

  componentDidMount() {
    // Events that came from Ticketmaster are enriched with live data from its API.
    const { ticketMasterId } = this.props.location.state.eventItem;
    if (ticketMasterId) {
      this.getEventById(ticketMasterId);
    }
  }

  getEventById = async (id) => {
    const apiUrl = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Ticketmaster responded with ${response.status}`);
      const event = await response.json();
      const venue = event._embedded && event._embedded.venues && event._embedded.venues[0];

      // The saved copy of this event (if any) tells us who is going.
      const saved = this.props.events.find((item) => item.ticketMasterId === id);
      const friendsGoing = saved ? saved.friendsGoing : [];

      this.setState({
        url: event.url,
        locationCity: venue && venue.city && venue.city.name,
        locationState: venue && venue.state && venue.state.name,
        isGoing: friendsGoing.some((friend) => friend.userName === this.props.user),
        error: null,
      });
    } catch (error) {
      console.error('Could not load event details', error);
      this.setState({ error: 'Could not load the latest details for this event.' });
    }
  };

  // Saves a copy of a Ticketmaster event to the user's calendar.
  handleSubmit = (e) => {
    e.preventDefault();
    const { eventItem } = this.props.location.state;

    this.props.createEvent({
      date: eventItem.date,
      eventName: eventItem.eventName,
      locationCity: this.state.locationCity || eventItem.locationCity || '',
      locationState: this.state.locationState || eventItem.locationState || '',
      isGoing: true,
      ticketMasterId: eventItem.ticketMasterId,
      image: eventItem.image || '',
      friendsGoing: [{ userName: this.props.user, profileImage: this.props.avatar || DEFAULT_AVATAR }],
    });
  };

  removeTicketMasterEvent = () => {
    const { ticketMasterId } = this.props.location.state.eventItem;
    this.props.events
      .filter((event) => event.ticketMasterId === ticketMasterId)
      .forEach((event) => this.props.removeEvent(event.id));
  };

  render() {
    const { eventItem } = this.props.location.state;
    const { url, error } = this.state;

    const city = eventItem.locationCity || this.state.locationCity;
    const region = eventItem.locationState || this.state.locationState;
    const location = [city, region].filter(Boolean).join(', ');

    // Events saved to the calendar carry their own `isGoing` flag; Ticketmaster
    // search results rely on the attendee list loaded above.
    const isSaved = eventItem.isGoing || this.state.isGoing;
    const removeHandler = eventItem.isGoing
      ? () => this.props.removeEvent(eventItem.id)
      : this.removeTicketMasterEvent;

    return (
      <div>
        {error && <div className='alert alert-warning' role='alert'>{error}</div>}
        <p><strong>{formatEventDate(eventItem.date)}</strong></p>
        {eventItem.image && (
          <img className='event-details-img' src={eventItem.image} alt={eventItem.eventName} />
        )}
        <h4>{url ? <a href={url}>{eventItem.eventName}</a> : eventItem.eventName}</h4>
        <p>{location}</p>
        {isSaved ? (
          <button onClick={removeHandler} className='btn btn-danger mb-1'>Remove event</button>
        ) : (
          <button onClick={this.handleSubmit} type='submit' className='btn btn-success mb-1'>Add event</button>
        )}
        {!eventItem.ticketMasterId && (
          <div>
            <Link to={{ pathname: `/edit-event/${eventItem.id}`, state: { eventItem } }}>
              <button className='btn btn-success'>Edit Event</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}
