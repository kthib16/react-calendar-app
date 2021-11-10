import React, { Component } from 'react';

export default class CreateEvent extends Component {
  state = {
  }

handleChange = e =>{
  this.setState({
    [e.target.name]: e.target.value
  })
}

handleSubmit = e => {
  e.preventDefault();
  const newEventObj = {
    date: parseInt(this.state.date),
    month: this.state.month,
    year: parseInt(this.state.year),
    eventName: this.state.eventName,
    isGoing: true,
    locationCity: this.state.locationCity,
    locationState: this.state.locationState
  }

  this.props.createEvent(newEventObj);
}


  render() {
    return(
      <main>
      <form className="g-3">
        <div className="mb-3">
          <input onChange={this.handleChange} value={this.state.eventName} name="eventName" placeholder="Enter Event Name" className="form-control form-control-lg"/>
        </div>
        <div className="row form-group mb-3">
          <input onChange={this.handleChange} value={this.state.locationCity} name="locationCity" type="text" placeholder="Enter City" className="form-control col-md-5 float-left" />
          <select onChange={this.handleChange} name="locationState" placeholder="Select State" className="form-control col-md-5 float-right">
                  <option>Alabama</option>
                  <option>Alaska</option>
                  <option>Arizona</option>
                  <option>Arkansas</option>
                  <option>California</option>
                  <option>Colorado</option>
                  <option>Connecticut</option>
                  <option>Delaware</option>
                  <option>Florida</option>
                  <option>Georgia</option>
                  <option>Hawaii</option>
                  <option>Idaho</option>
                  <option>Illinois</option>
                  <option>Indiana</option>
                  <option>Iowa</option>
                  <option>Kansas</option>
                  <option>Kentucky</option>
                  <option>Louisiana</option>
                  <option>Maine</option>
                  <option>Maryland</option>
                  <option>Massachusetts</option>
                  <option>Michigan</option>
                  <option>Minnesota</option>
                  <option>Mississippi</option>
                  <option>Missouri</option>
                  <option>Montana</option>
                  <option>Nebraska</option>
                  <option>Nevada</option>
                  <option>New Hampshire</option>
                  <option>New Jersey</option>
                  <option>New Mexico</option>
                  <option>New York</option>
                  <option>North Carolina</option>
                  <option>North Dakota</option>
                  <option>Ohio</option>
                  <option>Oklahoma</option>
                  <option>Oregon</option>
                  <option>Pennsylvania</option>
                  <option>Rhode Island</option>
                  <option>South Carolina</option>
                  <option>South Dakota</option>
                  <option>Tennessee</option>
                  <option>Texas</option>
                  <option>Utah</option>
                  <option>Vermont</option>
                  <option>Virginia</option>
                  <option>Washington</option>
                  <option>West Virginia</option>
                  <option>Wisconsin</option>
                  <option>Wyoming</option>
          </select>

        </div>
        <div className="col-md-6">
          <input onChange={this.handleChange} value={this.state.month} name="month" placeholder="Month" className="form-control"/>
        </div>
        <div className="col-md-4">
          <input onChange={this.handleChange} value={this.state.date} name="date" placeholder="Date" className="form-control" />
        </div>
        <div className="col-md-2">
          <input onChange={this.handleChange} value={this.state.year} name="year" placeholder="Year" className="form-control"/>
        </div>
        <div className="row col-12 float-right">
        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Create Event</button>
        </div>
        </form>

        </main>

    )
  }
}
