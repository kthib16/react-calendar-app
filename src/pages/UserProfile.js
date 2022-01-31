import React from 'react';

export default class UserProfile extends React.Component{
  state = {

  }

  render(){
    return(
      <>
      <img src={this.props.user.photoURL} />
      <h4>{this.props.user.displayName}</h4>
      </>
    )
  }
}
