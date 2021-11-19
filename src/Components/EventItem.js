import React from 'react';
import { Link } from 'react-router-dom';

const EventItem = (props) => {
  const sortedArr = props.events.sort(function(a,b){return new Date(a.date) - new Date(b.date)});
  const eventList = sortedArr.map(eventItem => {
    return(

      <li key={eventItem.id} className='list-group-item'>
      <Link to={{pathname: `/event/${eventItem.id}`, state: { eventItem: eventItem } } } >
        <div className='list-inline-item'>
          {eventItem.eventName}
        </div>
        </Link>
        <div className='list-inline-item float-right'>
        <Link to={{pathname: `/edit-event/${eventItem.id}`, state: { eventItem: eventItem }}} >
            <i className='fas fa-edit'></i>
        </Link>
          <button className='btn' onClick={() => props.removeEvent(eventItem.id)}>
            <i className='fas fa-trash'></i>
            </button>
        </div>
      </li>
    )
  })

  return(
    <ul className='list-group'>
      {eventList}
    </ul>
  )
}

export default EventItem;
