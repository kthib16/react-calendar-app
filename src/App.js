import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs} from 'firebase/firestore';
import EventItem from './pages/EventItem';

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
        guestsAttending: individualEvent.data().guestsAttending,
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

render(){
  return (
    <div className="App">
      <h4>My calendar</h4>
      <EventItem eventProps={this.state.events}/>
    </div>
  );
}
}
