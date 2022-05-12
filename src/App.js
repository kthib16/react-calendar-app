import './App.css';
import * as React from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { Home }  from './pages/Home';
import { MyCalendar } from './pages/MyCalendar';
import { CreateEvent } from './pages/CreateEvent';
import { NearbyEvents } from './pages/NearbyEvents';
import { EventDetails }  from './pages/EventDetails';
import { EditEvent } from './pages/EditEvent';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "jsr-914-3a79b.firebaseapp.com",
  projectId: "jsr-914-3a79b",
  storageBucket: "jsr-914-3a79b.appspot.com",
  messagingSenderId: "573368560534",
  appId: "1:573368560534:web:5c4bb34ecb946546d20bb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);

type State = {
  events: array
}

export default class App extends React.Component<{}, State> {
state: State = {
  events: []
}

componentDidMount() {
this.getEvents()
}


getEvents = async () => {
  const eventsCollection = collection(db, 'Events');
  const events = await getDocs(eventsCollection);
  const eventsArr = [];
  let upcomingEvents = 0;

  events.forEach(individualEvent => {
    if(this.checkDate(individualEvent.data().date)){

      if(this.checkUpcomingEvents(individualEvent.data().date)){
        upcomingEvents++
      }

    const eachEvent = {
      id: (individualEvent.data().id ? individualEvent.data().id : individualEvent.id),
        date: individualEvent.data().date,
        eventName: individualEvent.data().eventName,
        isGoing: individualEvent.data().isGoing,
        locationCity: individualEvent.data().locationCity,
        locationState: individualEvent.data().locationState,
        image: individualEvent.data().image,
        ticketMasterId: individualEvent.data().ticketMasterId,
        friendsGoing: individualEvent.data().friendsGoing
    }
    eventsArr.push(eachEvent)
  }
  })

  this.setState({
    events: eventsArr,
    upcomingEvents: upcomingEvents
  })
}

createEvent = async newEvent => {
  const eventsCollection = collection(db, 'Events');
  await addDoc(eventsCollection, newEvent);
  this.props.history.push('/');
  this.getEvents();
}

removeEvent = async eventId => {
  const eventsCollection = collection(db, 'Events');

  const eventDoc = doc(eventsCollection, eventId);
  await deleteDoc(eventDoc);
  this.props.history.push('/');
  this.getEvents();
}

updateEvent = async updatedEvent => {
  const eventsCollection = collection(db, 'Events');
  const eventDoc = doc(eventsCollection, updatedEvent.id);
  await setDoc(eventDoc, updatedEvent);
  this.props.history.push('/');
  this.getEvents();

}

login = () => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
      .then(result => {
        this.setState({
          user:result.user
        }, () => {this.props.history.push('/')})
      })

      .catch(error => console.log('error:', error))
  }


logout = () => {
  const auth = getAuth();
  signOut(auth)
  .then(() => {
    this.setState({
      user: null
    }, () => {this.props.history.push('/')})
  })
}

checkUpcomingEvents = date => {
  const today = new Date();
  let day = today.getDate().toString();
  let month = today.getMonth() + 1;
  month = month.toString()
  const year = today.getFullYear().toString();
  let eventDate = date.split('-')


  if(eventDate[0] === year && eventDate[1] === month && Math.abs(eventDate[2] - day) <= 7 ){
      return true
  }
}

checkDate = date => {
  const today = new Date();
  let day = today.getDate().toString();
  let month = today.getMonth() + 1;
  month = month.toString()
  const year = today.getFullYear().toString();
  let eventDate = date.split('-')

  if(eventDate[0] < year){
    return false
  } else if(eventDate[1] < month){
    return false
  } else if (eventDate[1] === month && eventDate[2] < day ){
    return false
} else {
  return true
  }


}

render(){
  return (

    <div className="App">
    <header className="App-header">
    {this.state.user
      ?(<>
        <div className="nav-home">
        <NavLink exact to='/my-calendar'>MY CALENDAR</NavLink>
        <NavLink exact to='/events-near-me'>          <i className="fas fa-search"></i>
SEARCH EVENTS</NavLink>
        </div>

        <div className='nav-user'>
        <NavLink exact to='/logout'>LOGOUT</NavLink>
        </div>
        <div className='nav-user'>
            <img className='nav-img' src={this.state.user.photoURL} alt='User profile'/>
        </div>
        </>
        )
        :(<>
          <div className="nav-home">
          MY CALENDAR
          </div>
          <div className='nav-user' onClick={this.login}>
            <NavLink exact to='/login'>SIGNUP/LOGIN</NavLink>
          </div></>
          )
        }
    </header>
      <main>
      <Switch>
      <Route exact path='/'>
        <Home
          state={this.state}
          upcomingEvents={this.state.upcomingEvents}
          />
      </Route>
        <Route exact path='/my-calendar'>
          {this.state.user
          ?<MyCalendar
            upcomingEvents={this.state.upcomingEvents}
            events={this.state.events}
            removeEvent={this.removeEvent}
            user={this.state.user}/>
          : <Redirect to={{pathname: '/login'}} />
        }
        </Route>
        <Route exact path='/logout' render={() => this.logout()}>

        </Route>


        <Route exact path='/logout' render={()=> this.logout()}>
        </Route>
        <Route exact path='/add-event'>
          {this.state.user
            ?<CreateEvent
              createEvent={this.createEvent}
              user={this.state.user.email} />
            :<Redirect to={{pathname: '/login'}} />
          }
        </Route>
        <Route exact path='/events-near-me'>
        {this.state.user
          ?<NearbyEvents
              zip={this.state.zip}/>
          :<Redirect to={{pathname: '/login'}} />
        }
        </Route>

        <Route path='/event/' render={({ location }) =>

        this.state.user
          ? <EventDetails
            location={ location }
            createEvent={this.createEvent}
            removeEvent={this.removeEvent}
            user={this.state.user.email}
            events={this.state.events}
          />
          :this.props.history.push('/login')
        } />
        <Route path='/edit-event/' render={({ location }) =>
          this.state.user
          ?<EditEvent
            location={ location }
            updateEvent={this.updateEvent} />
          :this.props.history.push('/login')
        } />
        <Route path='*'>
          <div className="panel panel-default homepage">404</div>
        </Route>
      </Switch>
      </main>
    </div>
  );
}
}
