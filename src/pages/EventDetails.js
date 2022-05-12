import * as React from 'react';
import { Link } from 'react-router-dom';


export class EventDetails extends React.Component {
state={

}

componentDidMount(){
  //checks if a ticketmaster ID was passed down from props. If so, pulls the event data from the ticketmaster API and sets state
  if(this.props.location.state.eventItem.ticketMasterId){
    this.getEventById(this.props.location.state.eventItem.ticketMasterId)
  }
}
  getEventById = id => {
    const apiUrl =  `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
    fetch(apiUrl)
    .then(response => {
      return response.json();
    })
    .then(parsedResponse => {
      let isGoing = false;
      let friendsGoing = []
      this.props.events.forEach(eachItem => {
        //Checks firebase database of events for Ticketmaster event and pulls the list of friends going.
        //Sets logic to true so it can later be used to determine whether the current user is attending.
        if(eachItem.ticketMasterId === id){
          for(var i = 0; i < eachItem.friendsGoing.length; i++){
            //only sets logic to true if the current user is in the list of friends going
            if(eachItem.friendsGoing[i].userName === this.props.user){
            isGoing = true
            friendsGoing = eachItem.friendsGoing
            }
            else{
            friendsGoing = eachItem.friendsGoing
            }
          return [isGoing, friendsGoing];
        }
      }})


      this.setState({
        event: parsedResponse,
        url: parsedResponse.url,
        locationCity: parsedResponse._embedded.venues[0].city.name,
        locationState: parsedResponse._embedded.venues[0].state.name,
        isGoing: isGoing,
        friendsGoing: friendsGoing
      })
    })
    .catch(error=>console.log('error', error))
  }

handleSubmit = e => {
  e.preventDefault();
  const { eventItem } = this.props.location.state;
  const eventImage = (eventItem.image ? eventItem.image : '')
  let date = eventItem.date.split('-')
  let month = date[1].split('')
  if(month[0] === '0'){
    month = month[1]
  } else{
    month = month.join('')
  }

  date = date[0] + '-' + month + '-' + date[2]

  const newEventObj = {
    date: date,
    eventName: eventItem.eventName,
    locationCity: this.state.locationCity,
    locationState: this.state.locationState,
    isGoing: true,
    ticketMasterId: eventItem.ticketMasterId,
    image: eventImage,
    friendsGoing: [{userName: this.props.user, profileImage: 'data:image/jpeg;base64,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'}]
  }

  this.props.createEvent(newEventObj);
}

removeTicketMasterEvent = () => {
  this.props.events.forEach(eachEvent => {
    if(eachEvent.ticketMasterId === this.state.event.id)
      this.props.removeEvent(eachEvent.id)
  })
}

render(){


  const { eventItem } = this.props.location.state;
  let location = (eventItem.locationCity ? `${eventItem.locationCity}, ${eventItem.locationState}` : `${this.state.locationCity}, ${this.state.locationState}`)
  let button = (eventItem.isGoing
            ? <button onClick={() => this.props.removeEvent(eventItem.id)} className='btn btn-danger mb-1'>
                  Remove event
              </button>

            : <button onClick={this.handleSubmit} type='submit' className="btn btn-success mb-1">
                  Add event
              </button>);
    let ticketMasterButton = (this.state.isGoing
              ? <button onClick={this.removeTicketMasterEvent} className='btn btn-danger mb-1'>
                    Remove event
                </button>
              : <button onClick={this.handleSubmit} type='submit' className="btn btn-success mb-1">
                    Add event
                </button>);
    let editButton = (eventItem.ticketMasterId === null
                      ?   <Link to={{pathname: `/edit-event/${eventItem.id}`, state: { eventItem: eventItem }}} >
                            <button className='btn btn-success'>Edit Event</button>
                        </Link>
                      :''
                    )
    let image = (eventItem.image
            ? <img className='event-details-img' src={eventItem.image} alt={eventItem.eventName} />
            : '');




    const date = eventItem.date.split('-');
    let month = date[1].split('')
    if(month[0] === '0'){
      month = month[1]
    } else{
      month = month.join('')
    }

        if(month === '1') {
          month = 'January'
        }
        else if(month === '2'){
          month='February'
        }
        else if(month === '3'){
          month='March'
        }
        else if(month === '4'){
          month='April'
        }
        else if(month === '5'){
          month='May'
        }
        else if(month === '6'){
          month='June'
        }
        else if(month === '7'){
          month='July'
        }
        else if(month === '8'){
          month='August'
        }
        else if(month === '9'){
          month='September'
        }
        else if(month === '10'){
          month='October'
        }
        else if(month === '11'){
          month='November'
        }
        else if(month === '12'){
          month='December'
        }


  return(
    <div>
    <p><strong>{month} {date[2]}, {date[0]}</strong></p>
    {image}
    <h4>
      <a href={this.state.url}>
        {eventItem.eventName}
      </a>
    </h4>
    <p>
    {location}
    </p>
    {this.props.location.state.eventItem.isGoing
      ?button
      :ticketMasterButton}

      <div>{editButton}</div>

    </div>
  )
}
}
