import * as React from 'react';

const Login = ({ login, loading }) => (
  <div className='home'>
    <h1>Sign in</h1>
    <h5>Sign in with your Google account to view and manage your calendar.</h5>
    <button type='button' className='btn btn-primary mt-3' onClick={login} disabled={loading}>
      <i className='fab fa-google'></i> Sign in with Google
    </button>
  </div>
);

export default Login;
