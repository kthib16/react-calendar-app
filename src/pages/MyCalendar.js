import React from 'react';
import { NavLink } from 'react-router-dom';
import EventItem from '../Components/EventItem';
import UpcomingEvents from '../Components/UpcomingEvents'

export class MyCalendar extends React.Component {

state ={
  events: []
}

componentDidMount(){

}

  render(){
    return (
      <main>
      {this.props.upcomingEvents
        ?<UpcomingEvents upcomingEvents={this.props.upcomingEvents} />
        : ''}

        
      <h4>My Calendar</h4>

      <EventItem events={this.props.events} removeEvent={this.props.removeEvent} user={this.props.user}/>
      <NavLink exact to='/add-event'><button className='btn btn-success add-event-button'><strong>+ Add Event</strong></button></NavLink>
      </main>
    )
  }
}
