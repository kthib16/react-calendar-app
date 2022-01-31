import React from 'react';

export default class Register extends React.Component{
  state={
    email: '',
    password: '',
    displayName: '',
    photoURL: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.register(this.state)
  }

  render() {
    return(
      <div className="container">
      <form onSubmit={this.handleSubmit}>
              <div>
                  <input
                    type="text"
                    className="form-control my-3"
                    placeholder="Display Name"
                    name="displayName"
                    value={this.state.displayName}
                    onChange={this.handleChange}
                    />
              </div>
              <div>
                  <input
                    type="text"
                    className="form-control my-3"
                    placeholder="Photo URL"
                    name="photoURL"
                    value={this.state.photoURL}
                    onChange={this.handleChange}
                    />
              </div>
              <div>
                  <input
                      type="text"
                      className="form-control my-3"
                      placeholder="Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                  />
              </div>
              <div>
                  <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                  />
              </div>
              <div className="text-center my-3">
                  <button
                      type="submit"
                      className="btn btn-primary my-2 w-100"
                  >
                      Register
                  </button>
              </div>

          </form>
          </div>
    )
  }
}
