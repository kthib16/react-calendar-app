import React from 'react';
import { Link } from 'react-router-dom';

export default class EventDetails extends React.Component {
state={

}

componentDidMount(){
  this.getEventById(this.props.location.state.eventItem.id)
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

getImage = searchTerm => {
  const apiUrl = `https://serpapi.com/search.json?q=${searchTerm}&tbm=isch&api_key=0ec56cecc96fcfa875f7bd1b07f2427c7f1f3e3efdc61cd61f88f38566644d5b`
  fetch(apiUrl)
  .then(response => response.json())
  .then(parsedResponse => console.log(parsedResponse))
  .catch(error => console.log('error:', error))
}

handleSubmit = e => {
  e.preventDefault();
  const { eventItem } = this.props.location.state;
  const newEventObj = {
    date: eventItem.date,
    month: eventItem.month,
    year: eventItem.year,
    eventName: eventItem.eventName,
    locationCity: this.state.locationCity,
    locationState: this.state.locationState,
    isGoing: true
  }

  this.props.createEvent(newEventObj);
}

addButton = () => {
  if (this.props.location.state.eventItem.isGoing = true){
  return(
    <button className='btn btn-danger'>
  Remove from my calendar
  </button>)}
  else {
    return(
  <button onClick={this.handleSubmit} type='submit' className="btn btn-success">
    Add to my calendar
  </button>
  )}
}

render(){
  const { eventItem } = this.props.location.state;
  let location = (eventItem.locationCity ? `${eventItem.locationCity}, ${eventItem.locationState}` : `${this.state.locationCity}, ${this.state.locationState}`)
  let button = (eventItem.isGoing
            ? <button className='btn btn-danger'>
                  Remove from my calendar
              </button>
            : <button onClick={this.handleSubmit} type='submit' className="btn btn-success">
                  Add to my calendar
              </button>);
    let image = (eventItem.image
            ? <img className='event-details-img' src={eventItem.image} alt={eventItem.name} />
            : '')

  return(
    <div>
    <p>{eventItem.month} {eventItem.date}, {eventItem.year}</p>
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
