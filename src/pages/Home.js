
import React from 'react';

export default class Home extends React.Component {
  render(){
    return (
      <div className='home'>
      <img className='img-home' src='/logo192.png' alt="My calendar app logo"/>
      <h1>Welcome to my calendar app!</h1>
      <h5>The easy way to keep track of your events and stay connected with friends</h5>
      </div>
    )
  }
}
