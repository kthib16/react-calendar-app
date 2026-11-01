import React from 'react';
import { NavLink } from 'react-router-dom';
import EventItem from '../Components/EventItem';
import UpcomingEvents from '../Components/UpcomingEvents';

export const MyCalendar = ({ upcomingEvents, events, removeEvent, user }) => (
  <div>
    {upcomingEvents > 0 && <UpcomingEvents upcomingEvents={upcomingEvents} />}
    <h4>My Calendar</h4>
    <EventItem events={events} removeEvent={removeEvent} user={user} />
    <NavLink exact to='/add-event'>
      <button className='btn btn-success add-event-button'><strong>+ Add Event</strong></button>
    </NavLink>
  </div>
);
