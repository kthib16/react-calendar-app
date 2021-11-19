import React from 'react';
import { Link } from 'react-router-dom';

export default class EventDetails extends React.Component {
state={

}

componentDidMount(){
  this.getEventById(this.props.location.state.eventItem.ticketMasterId)
}
  getEventById = id => {
    const apiUrl =  `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
    fetch(apiUrl)
    .then(response => {
      return response.json();
    })
    .then(parsedResponse => {
      console.log('parsedResponse', parsedResponse)
      this.setState({
        event: parsedResponse,
        url: parsedResponse.url,
        locationCity: parsedResponse._embedded.venues[0].city.name,
        locationState: parsedResponse._embedded.venues[0].state.name,
        isGoing: false
      })
    })
    .catch(error=>console.log('error', error))
  }

handleSubmit = e => {
  e.preventDefault();
  const { eventItem } = this.props.location.state;
  const eventImage = (eventItem.image ? eventItem.image : '')
  const newEventObj = {
    date: eventItem.date,
    eventName: eventItem.eventName,
    locationCity: this.state.locationCity,
    locationState: this.state.locationState,
    isGoing: true,
    ticketMasterId: eventItem.ticketMasterId,
    image: eventImage
  }

  this.props.createEvent(newEventObj);
}


render(){
  const { eventItem } = this.props.location.state;
  console.log('event Item', eventItem)
  let location = (eventItem.locationCity ? `${eventItem.locationCity}, ${eventItem.locationState}` : `${this.state.locationCity}, ${this.state.locationState}`)
  let button = (eventItem.isGoing
            ? <button onClick={() => this.props.removeEvent(eventItem.id)} className='btn btn-danger'>
                  Remove from my calendar
              </button>
            : <button onClick={this.handleSubmit} type='submit' className="btn btn-success">
                  Add to my calendar
              </button>);
    let image = (eventItem.image
            ? <img className='event-details-img' src={eventItem.image} alt={eventItem.eventName} />
            : '');

    const date = eventItem.date.split('-');
    let month =''
        if(date[1] === '01') {
          month = 'January'
        }
        else if(date[1] === '02'){
          month='February'
        }
        else if(date[1] === '03'){
          month='March'
        }
        else if(date[1] === '04'){
          month='April'
        }
        else if(date[1] === '05'){
          month='May'
        }
        else if(date[1] === '06'){
          month='June'
        }
        else if(date[1] === '07'){
          month='July'
        }
        else if(date[1] === '08'){
          month='August'
        }
        else if(date[1] === '09'){
          month='September'
        }
        else if(date[1] === '10'){
          month='October'
        }
        else if(date[1] === '11'){
          month='November'
        }
        else if(date[1] === '12'){
          month='December'
        }


  return(
    <div>
    <p>{month} {date[2]}, {date[0]}</p>
    {image}
    <h4>
      <a href={this.state.url}>
        {eventItem.eventName}
      </a>
    </h4>
    <p>
    {location}
    </p>
    {button}
    </div>
  )
}
}
