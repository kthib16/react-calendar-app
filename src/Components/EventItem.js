import React from 'react';
import { Link } from 'react-router-dom';

const EventItem = (props) => {
  const sortedArr = props.events.sort(function(a,b){return new Date(a.date) - new Date(b.date)});
  const eventList = sortedArr.map(eventItem => {
    for(var i = 0; i < eventItem.friendsGoing.length; i++){
      if(eventItem.friendsGoing[i].userName === props.user.email){
        return(

          <li key={eventItem.id} className='list-group-item'>
          <Link to={{pathname: `/event/${eventItem.ticketMasterId ?eventItem.ticketMasterId :eventItem.id}`, state: { eventItem: eventItem } } } >
            <div className='list-inline-item'>
              {eventItem.eventName}
            </div>
            </Link>
            <div className='list-inline-item float-right'>
              <button className='btn' onClick={() => props.removeEvent(eventItem.id)}>
                <i className='fas fa-trash'></i>
                </button>
            </div>
          </li>
        )
      }
    }

  })

  return(
    <ul className='list-group'>
      {eventList}
    </ul>
  )
}

export default EventItem;
