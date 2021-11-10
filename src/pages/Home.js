import React from 'react';
import EventItem from '../Components/EventItem';

export default class Home extends React.Component {
  render(){
    return (
      <main>
      <h4>My calendar</h4>
      <EventItem events={this.props.events} />
      </main>
    )
  }
}
