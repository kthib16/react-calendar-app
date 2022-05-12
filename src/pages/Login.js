import * as React from 'react';

export default class Login extends React.Component{
  state={
    email: '',
    password: ''

  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state)
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
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
                      className="btn btn-success my-2 w-100"
                  >
                      Login
                  </button>
              </div>
              <div className="text-center my-3">
                  Don't have an account? <a href='/register'>Signup!</a>
              </div>
          </form>
    )
  }
}
