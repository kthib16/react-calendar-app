import './App.css';
import * as React from 'react';
import { Switch, Route, NavLink, Redirect, withRouter } from 'react-router-dom';
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { db, auth, isFirebaseConfigured } from './firebase';
import { isUpcoming, isWithinDays } from './utils/dates';
import { Home } from './pages/Home';
import Login from './pages/Login';
import { MyCalendar } from './pages/MyCalendar';
import { CreateEvent } from './pages/CreateEvent';
import { NearbyEvents } from './pages/NearbyEvents';
import { EventDetails } from './pages/EventDetails';
import { EditEvent } from './pages/EditEvent';

const eventsCollection = () => collection(db, 'Events');

export class App extends React.Component {
  state = {
    events: [],
    upcomingEvents: 0,
    user: undefined,
    authReady: false,
    error: null,
  };

  componentDidMount() {
    if (!isFirebaseConfigured) {
      this.setState({
        authReady: true,
        error: 'Firebase is not configured. Copy .env.example to .env and add your keys (see the README).',
      });
      return;
    }

    // Restores the session after a refresh and keeps `user` in sync with Firebase Auth.
    this.unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      this.setState({ user: user || undefined, authReady: true });
    });
    this.getEvents();
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) this.unsubscribeAuth();
  }

  getEvents = async () => {
    try {
      const snapshot = await getDocs(eventsCollection());
      const events = [];

      snapshot.forEach((document) => {
        const data = document.data();
        if (!isUpcoming(data.date)) return;
        events.push({
          id: data.id ? data.id : document.id,
          date: data.date,
          eventName: data.eventName,
          isGoing: data.isGoing,
          locationCity: data.locationCity,
          locationState: data.locationState,
          image: data.image,
          ticketMasterId: data.ticketMasterId,
          friendsGoing: data.friendsGoing || [],
        });
      });

      this.setState({
        events,
        upcomingEvents: events.filter((event) => isWithinDays(event.date, 7)).length,
        error: null,
      });
    } catch (error) {
      console.error('Could not load events', error);
      this.setState({ error: 'Could not load events. Please try again later.' });
    }
  };

  createEvent = async (newEvent) => {
    await addDoc(eventsCollection(), newEvent);
    this.props.history.push('/');
    this.getEvents();
  };

  removeEvent = async (eventId) => {
    await deleteDoc(doc(eventsCollection(), eventId));
    this.props.history.push('/');
    this.getEvents();
  };

  updateEvent = async (updatedEvent) => {
    await setDoc(doc(eventsCollection(), updatedEvent.id), updatedEvent);
    this.props.history.push('/');
    this.getEvents();
  };

  login = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      this.props.history.push('/');
    } catch (error) {
      console.error('Sign-in failed', error);
    }
  };

  logout = async () => {
    await signOut(auth);
    this.props.history.push('/');
  };

  // Renders `children` for signed-in users and sends everyone else to the login page.
  // Waits for Firebase to restore the session first so a refresh doesn't bounce users out.
  requireUser = (children) => {
    if (!this.state.authReady) return <p role='status'>Loading…</p>;
    return this.state.user ? children() : <Redirect to='/login' />;
  };

  render() {
    const { user, events, upcomingEvents, error, authReady } = this.state;

    return (
      <div className='App'>
        <header className='App-header'>
          {user ? (
            <>
              <div className='nav-home'>
                <NavLink exact to='/my-calendar'>MY CALENDAR</NavLink>
                <NavLink exact to='/events-near-me'>
                  <i className='fas fa-search'></i> SEARCH EVENTS
                </NavLink>
              </div>
              <div className='nav-user'>
                <button type='button' className='btn btn-link nav-button' onClick={this.logout}>LOG OUT</button>
              </div>
              <div className='nav-user'>
                <img className='nav-img' src={user.photoURL} alt='User profile' />
              </div>
            </>
          ) : (
            <>
              <div className='nav-home'>MY CALENDAR</div>
              <div className='nav-user'>
                <button type='button' className='btn btn-link nav-button' onClick={this.login}>SIGN UP / LOG IN</button>
              </div>
            </>
          )}
        </header>
        <main>
          {error && <div className='alert alert-danger' role='alert'>{error}</div>}
          <Switch>
            <Route exact path='/'>
              <Home upcomingEvents={user ? upcomingEvents : 0} />
            </Route>
            <Route exact path='/login'>
              {user ? <Redirect to='/' /> : <Login login={this.login} loading={!authReady} />}
            </Route>
            <Route exact path='/my-calendar'>
              {this.requireUser(() => (
                <MyCalendar
                  upcomingEvents={upcomingEvents}
                  events={events}
                  removeEvent={this.removeEvent}
                  user={user}
                />
              ))}
            </Route>
            <Route exact path='/add-event'>
              {this.requireUser(() => <CreateEvent createEvent={this.createEvent} user={user.email} avatar={user.photoURL} />)}
            </Route>
            <Route exact path='/events-near-me'>
              {this.requireUser(() => <NearbyEvents />)}
            </Route>
            <Route
              path='/event/'
              render={({ location }) =>
                this.requireUser(() =>
                  location.state && location.state.eventItem ? (
                    <EventDetails
                      location={location}
                      createEvent={this.createEvent}
                      removeEvent={this.removeEvent}
                      user={user.email}
                      avatar={user.photoURL}
                      events={events}
                    />
                  ) : (
                    <Redirect to='/' />
                  )
                )
              }
            />
            <Route
              path='/edit-event/'
              render={({ location }) =>
                this.requireUser(() =>
                  location.state && location.state.eventItem ? (
                    <EditEvent location={location} updateEvent={this.updateEvent} />
                  ) : (
                    <Redirect to='/' />
                  )
                )
              }
            />
            <Route path='*'>
              <div className='panel panel-default homepage'>404 – page not found</div>
            </Route>
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
