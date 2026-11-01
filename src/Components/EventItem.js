import React from 'react';
import { Link } from 'react-router-dom';
import { parseEventDate } from '../utils/dates';

const byDate = (a, b) => parseEventDate(a.date) - parseEventDate(b.date);

// Lists the events the signed-in user is attending, soonest first.
const EventItem = ({ events, removeEvent, user }) => {
  const myEvents = events
    .filter((event) => (event.friendsGoing || []).some((friend) => friend.userName === user.email))
    .sort(byDate);

  if (myEvents.length === 0) {
    return <p className='text-muted'>You have no upcoming events yet.</p>;
  }

  return (
    <ul className='list-group'>
      {myEvents.map((event) => (
        <li key={event.id} className='list-group-item d-flex justify-content-between text-left align-middle'>
          <Link
            to={{
              pathname: `/event/${event.ticketMasterId ? event.ticketMasterId : event.id}`,
              state: { eventItem: event },
            }}
          >
            <div>{event.eventName}</div>
          </Link>
          <div>
            <button
              className='btn'
              onClick={() => removeEvent(event.id)}
              aria-label={`Remove ${event.eventName}`}
            >
              <i className='fas fa-trash'></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EventItem;
