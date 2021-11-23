import React from 'react';

export default class EditEvent extends React.Component{

state={
  formData: this.props.location.state.eventItem

};

handleChange= e =>{
  this.setState({
    formData: {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }
  })
};

handleSubmit = e => {
  e.preventDefault();

  this.props.updateEvent(this.state.formData);
};

render(){

    return(
      <main>
      <div className='form-container'>
      <form >
        <div className='form-group' >
          <input onChange={this.handleChange} value={this.state.formData.eventName} name="eventName" placeholder="Enter Event Name" className="form-control form-control-lg"/>
        </div>
        <div className="form-row form-group">
          <div className='col-md-6'>
            <input onChange={this.handleChange} value={this.state.formData.locationCity} name="locationCity" type="text" placeholder="Enter City" className='form-control' />
          </div>
          <div className='col-md-6'>
          <select onChange={this.handleChange} value={this.state.formData.locationState} name="locationState" className='form-control'>
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

        </div>
        <div className='form-group'>
          <input onChange={this.handleChange} value={this.state.formData.date} name="date" placeholder="YYYY-MM-DD" className="form-control" />
        </div>
        <div>
        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Update Event</button>
        </div>
        </form>
        </div>
        </main>

    )
  }
}
