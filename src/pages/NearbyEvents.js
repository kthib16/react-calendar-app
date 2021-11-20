import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NearbyEvents extends Component {

state={
  events: []
}

componentDidMount(){
    console.log(this.props.zip)
}

componentDidUpdate(previousProps){

if(this.props.zip !== previousProps.zip){
  this.getEvents(this.props.zip)
}
}

getEvents = zip => {

  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?&postalCode=${zip}&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  fetch(apiUrl)
  .then(response => {
    return response.json();
  })
  .then(parsedResponse => {
    const sortedArr = parsedResponse._embedded.events.sort(function(a,b){return new Date(a.dates.start.dateTime) - new Date(b.dates.start.dateTime)});
    sortedArr.forEach(eventItem => {
      const newEventObj={
          ticketMasterId: eventItem.id,
          date: eventItem.dates.start.localDate,
          eventName: eventItem.name,
          image: eventItem.images[2].url,
          isGoing: false

      }

      this.setState({
        events: [...this.state.events, newEventObj]
    })
  })})
  .catch(error=>console.log('error', error))

}




  render(){

    return(
      <div>

      <h4>Nearby Events</h4>
      <div className='container'>
      {this.state.events.map(eventItem => {
        let date = eventItem.date.split('-')
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
                <div key={eventItem.id}  className="card">
                <Link to={{pathname: `/event/${eventItem.id}`, state: { eventItem: eventItem } } } >

                  <img className="card-img-top" src={eventItem.image} alt={eventItem.eventName} />
                  <div className="card-body">
                    <h5 className="card-title">{eventItem.eventName}</h5>
                    <p className="card-text">{month} {date[2]}, {date[0]}</p>
                  </div>
              </Link>
              </div>
                )
              })}
      </div>
      </div>


)}

}
