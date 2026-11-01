import React from 'react';
import UpcomingEvents from '../Components/UpcomingEvents';

export const Home = ({ upcomingEvents }) => (
  <div className='home'>
    {upcomingEvents > 0 && <UpcomingEvents upcomingEvents={upcomingEvents} />}
    <img className='img-home' src='/logo192.png' alt='My Calendar app logo' />
    <h1>Welcome to my calendar app!</h1>
    <h5>The easy way to keep track of your events and stay connected with friends</h5>
  </div>
);
