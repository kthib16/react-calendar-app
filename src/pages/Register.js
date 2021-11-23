import React from 'react';

export default class Register extends React.Component{
  state={
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    zip: ''

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
                    placeholder="First Name"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    />
              </div>
              <div>
                  <input
                    type="text"
                    className="form-control my-3"
                    placeholder="Last Name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    />
              </div>
              <div>
                  <input
                    type="text"
                    className="form-control my-3"
                    placeholder="ZIP code"
                    name="zip"
                    value={this.state.zip}
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
