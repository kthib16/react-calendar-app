import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import NearbyEvents from './pages/NearbyEvents';
import EventDetails from './pages/EventDetails';
import EditEvent from './pages/EditEvent';

const firebaseConfig = {
  apiKey: "AIzaSyCBerhVvYqX_oITGaqgzbYhtT01AoprpzE",
  authDomain: "jsr-914-3a79b.firebaseapp.com",
  projectId: "jsr-914-3a79b",
  storageBucket: "jsr-914-3a79b.appspot.com",
  messagingSenderId: "573368560534",
  appId: "1:573368560534:web:5c4bb34ecb946546d20bb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);


export default class App extends React.Component {
state = {
  events: []
}

componentDidMount() {
  this.getEvents();
}

getEvents = async () => {
  const eventsCollection = collection(db, 'Events');
  const events = await getDocs(eventsCollection);
  const eventsArr = [];
  events.forEach(individualEvent => {
    const eachEvent = {
      id: individualEvent.id,
        date: individualEvent.data().date,
        month: individualEvent.data().month,
        year: individualEvent.data().year,
        eventName: individualEvent.data().eventName,
        isGoing: individualEvent.data().isGoing,
        locationCity: individualEvent.data().locationCity,
        locationState: individualEvent.data().locationState
    }
    eventsArr.push(eachEvent)
  })

  this.setState({
    events: eventsArr
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


render(){
  return (
    <div className="App">
    <header className="App-header">
      <div className="nav-home">
        <NavLink exact to='/'>MY CALENDAR</NavLink>
      </div>
      <nav>
        <NavLink exact to='/add-event'>CREATE EVENT</NavLink>
        <NavLink exact to='/events-near-me'>EVENTS NEAR ME</NavLink>
      </nav>
    </header>
      <main>
      <Switch>
        <Route exact path='/'>
          <Home events={this.state.events} removeEvent={this.removeEvent}/>
        </Route>
        <Route exact path='/add-event'>
          <CreateEvent createEvent={this.createEvent} />
        </Route>
        <Route exact path='/events-near-me'>
          <NearbyEvents />
        </Route>
        <Route path='/event/' render={({ location }) =>
          <EventDetails
            location={ location }
            createEvent={this.createEvent}
          />
        } />
        <Route path='/edit-event/' render={({ location }) =>
          <EditEvent
            location={ location }
            updateEvent={this.updateEvent} />
        } />
      </Switch>
      </main>
    </div>
  );
}
}
