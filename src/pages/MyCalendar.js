import React from 'react';
import EventItem from '../Components/EventItem';

export default class MyCalendar extends React.Component {
  render(){
    return (
      <main>
      <h4>My Calendar</h4>
      <EventItem events={this.props.events} removeEvent={this.props.removeEvent}/>
      </main>
    )
  }
}
