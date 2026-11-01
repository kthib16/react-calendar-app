import React from 'react';
import StateSelect from '../Components/StateSelect';

export class EditEvent extends React.Component {
  state = {
    formData: this.props.location.state.eventItem,
  };

  handleChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateEvent(this.state.formData);
  };

  render() {
    const { eventName, locationCity, locationState, date, image } = this.state.formData;

    return (
      <div className='form-container'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='eventName'>Event Title</label>
            <input
              id='eventName'
              name='eventName'
              value={eventName || ''}
              onChange={this.handleChange}
              placeholder='Enter event name'
              className='form-control form-control-lg'
              required
            />
          </div>
          <div className='form-row form-group'>
            <div className='col-md-6'>
              <label htmlFor='locationCity'>City</label>
              <input
                id='locationCity'
                name='locationCity'
                type='text'
                value={locationCity || ''}
                onChange={this.handleChange}
                placeholder='Enter city'
                className='form-control'
                required
              />
            </div>
            <div className='col-md-6'>
              <label htmlFor='locationState'>State</label>
              <StateSelect
                id='locationState'
                name='locationState'
                value={locationState || ''}
                onChange={this.handleChange}
                placeholder='Select state...'
              />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='date'>Date</label>
            <input
              id='date'
              name='date'
              value={date || ''}
              onChange={this.handleChange}
              placeholder='YYYY-MM-DD'
              pattern='\d{4}-\d{1,2}-\d{1,2}'
              title='Use the format YYYY-MM-DD'
              className='form-control'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='image'>Event Image</label>
            <input
              id='image'
              name='image'
              type='url'
              value={image || ''}
              onChange={this.handleChange}
              placeholder='Image URL'
              className='form-control'
            />
          </div>
          <button type='submit' className='btn btn-primary'>Update Event</button>
        </form>
      </div>
    );
  }
}
