import React from 'react';
import CalendarSelect from '../Components/DatePicker';
import StateSelect from '../Components/StateSelect';
import { DEFAULT_AVATAR, DEFAULT_EVENT_IMAGE } from '../constants';
import { toEventDateString } from '../utils/dates';

export class CreateEvent extends React.Component {
  state = {
    eventName: '',
    locationCity: '',
    locationState: '',
    image: '',
    date: toEventDateString(new Date()),
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setDate = (date) => {
    this.setState({ date: toEventDateString(date) });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { eventName, locationCity, locationState, image, date } = this.state;

    this.props.createEvent({
      date,
      eventName: eventName.trim(),
      image: image.trim() || DEFAULT_EVENT_IMAGE,
      isGoing: true,
      ticketMasterId: null,
      locationCity: locationCity.trim(),
      locationState,
      friendsGoing: [{ userName: this.props.user, profileImage: this.props.avatar || DEFAULT_AVATAR }],
    });
  };

  render() {
    const { eventName, locationCity, locationState, image } = this.state;

    return (
      <div className='form-container'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='eventName'>Event Title</label>
            <input
              id='eventName'
              name='eventName'
              value={eventName}
              onChange={this.handleChange}
              placeholder='Enter event title'
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
                value={locationCity}
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
                value={locationState}
                onChange={this.handleChange}
                placeholder='Select state...'
              />
            </div>
          </div>
          <div className='form-row form-group'>
            <div className='col-md-6'>
              <label htmlFor='date'>Date</label>
              <CalendarSelect id='date' setDate={this.setDate} />
            </div>
            <div className='col-md-6'>
              <label htmlFor='image'>Event Image</label>
              <input
                id='image'
                name='image'
                type='url'
                value={image}
                onChange={this.handleChange}
                placeholder='Image URL (optional)'
                className='form-control'
              />
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>Create Event</button>
        </form>
      </div>
    );
  }
}
