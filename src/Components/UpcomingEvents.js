import React from 'react';

const UpcomingEvents = ({ upcomingEvents }) => (
  <div className='upcoming-events-alert alert alert-secondary alert-dismissible fade show' role='alert'>
    You have <strong>{upcomingEvents}</strong> upcoming {upcomingEvents === 1 ? 'event' : 'events'}
    <button className='alert-dismiss' data-dismiss='alert' aria-label='Close'>
      <span aria-hidden='true'><strong>X</strong></span>
    </button>
  </div>
);

export default UpcomingEvents;
