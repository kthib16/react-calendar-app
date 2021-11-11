import React, { Component } from 'react';

export default class NearbyEvents extends Component {

state={
  events: []
}

componentDidMount() {
  this.getEvents(20009);
}

getEvents = zip => {
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${zip}&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  fetch(apiUrl)
  .then(response => {
    return response.json();
  })
  .then(parsedResponse => {
    this.setState({
      events: parsedResponse._embedded.events
    })
  })
  .catch(error=>console.log('error', error))
}


  render(){
    return(
      <div>
      <h4>Nearby Events</h4>
      <div className='container'>
          {this.state.events.map(event => {
            // const date = event.dates.start.localDate.split('-')
            // let month =''
            // if(date[1] === '1') {
            //   month = 'January'
            // }
            // else if(date[1] === '2'){
            //   month='February'
            // }
            // else if(date[1] === '3'){
            //   month='March'
            // }
            // else if(date[1] === '4'){
            //   month='April'
            // }
            // else if(date[1] === '5'){
            //   month='May'
            // }
            // else if(date[1] === '6'){
            //   month='June'
            // }
            // else if(date[1] === '7'){
            //   month='July'
            // }
            // else if(date[1] === '8'){
            //   month='August'
            // }
            // else if(date[1] === '9'){
            //   month='September'
            // }
            // else if(date[1] === '10'){
            //   month='October'
            // }
            // else if(date[1] === '11'){
            //   month='November'
            // }
            // else if(date[1] === '12'){
            //   month='December'
            // }
            // console.log(typeof date[1])
            // let formattedDate= `${month} ${date[2]}, ${date[0]}`
              return(

                    <div key={event.id}  className="card">
                      <img className="card-img-top" src={event.images[0].url} alt={event.name} />
                      <div className="card-body">
                        <h5 className="card-title">{event.name}</h5>
                        <p className="card-text">{event.dates.start.localDate}</p>
                      </div>
                    </div>

                    )
                  })}
                  </div>
      </div>

    )
  }
}
