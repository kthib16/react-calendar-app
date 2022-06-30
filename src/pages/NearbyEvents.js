import * as React from 'react';
import { Link } from 'react-router-dom';

export class NearbyEvents extends React.Component<MyProps, MyState> {


state = {
  events: []
}
getEvents = input => {

  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?${input}&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
  fetch(apiUrl)
  .then(response => {
    return response.json();
  })
  .then(parsedResponse => {
    console.log(parsedResponse)
    const sortedArr = parsedResponse._embedded.events.sort(function(a,b){return new Date(a.dates.start.dateTime) - new Date(b.dates.start.dateTime)});
    let eventArr = []
    console.log(sortedArr)
    sortedArr.forEach(eventItem => {
      let date = eventItem.dates.start.localDate.split('-')
      let month = date[1].split('')
      if(month[0] === '0'){
        month = month[1]
      } else{
        month = month.join('')
      }

      date = date[0] + '-' + month + '-' + date[2]
      const newEventObj={
          ticketMasterId: eventItem.id,
          date: eventItem.dates.start.localDate,
          eventName: eventItem.name,
          image: eventItem.images[2].url,
          isGoing: false,
          locationCity: eventItem._embedded.venues[0].city.name,
          locationCountry: eventItem._embedded.venues[0].country.name


      }

      if(eventItem._embedded.venues[0].state ){
        newEventObj.locationState = eventItem._embedded.venues[0].state.name
      }

      eventArr.push(newEventObj)
  })

  this.setState({
    events: eventArr
  })

  })
  .catch(error=>console.log('error', error))

}

onChange = e => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

onSubmit = e => {
  e.preventDefault();
  let searchParam = ''
  if(this.state.searchQuery === 'ZIP'){
    searchParam = `&postalCode=${this.state.searchInput}`
    console.log(searchParam)
    this.getEvents(searchParam)
  } else if(this.state.searchQuery === 'Keyword') {
    searchParam = `&keyword=${this.state.searchInput}`
    console.log(searchParam)
    this.getEvents(searchParam)
  } else if(!this.state.searchQuery || this.state.searchQuery === ''){
    alert("Please select a search option from the dropdown menu")
  } else if(!this.state.searchInput || this.state.searchInput === ''){
    alert("Please enter a search term")
  }
}




  render(){

    return(
      <div>

      <h4>Nearby Events</h4>
      <form className="input-group " onSubmit={this.onSubmit}>
          <input onChange={this.onChange} type="search" name="searchInput" id="form1" className="form-control" placeholder="Search" value={this.state.searchInput}/>
          <select onChange={this.onChange} name="searchQuery" className='form-control form-select' value={this.state.searchQuery}>
                  <option>Search by...</option>
                  <option>ZIP</option>
                  <option>Keyword</option>

          </select>

        <button type="button" className="btn btn-primary" onClick={this.onSubmit}>
          <i className="fas fa-search"></i>
        </button>
        </form>
      <div className='container'>
      {this.state.events
        ?this.state.events.map(eventItem => {
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
                <div key={eventItem.id}  className="card overflow-auto">
                <Link to={{pathname: `/event/${eventItem.ticketMasterId}`, state: { eventItem: eventItem } } } >

                  <img className="card-img-top" src={eventItem.image} alt={eventItem.eventName} />
                  <div className="card-body">
                    <h5 className="card-title">{eventItem.eventName}</h5>
                    <p className="card-text">{month} {date[2]}, {date[0]}</p>

                    {eventItem.locationState
                      ?<p className="card-text">{eventItem.locationCity}, {eventItem.locationState}</p>
                      :<p className="card-text">{eventItem.locationCity}, {eventItem.locationCountry}</p>

                    }
                  </div>
              </Link>
              </div>
                )
          })
        : ''
        }
      </div>
      </div>
    )}


}
