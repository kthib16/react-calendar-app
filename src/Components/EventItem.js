import React from 'react';

const EventItem = (props) => {
  const eventList = props.events.map(eventItem => {
    return(
      <li key={eventItem.id} className='list-group-item'>
        <div className='list-inline-item'>
          {eventItem.eventName}
        </div>
        <div className='list-inline-item float-right'>
          <i className='fas fa-edit'></i>
          <i className='fas fa-trash'></i>
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
