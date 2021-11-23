import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc, auth } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, currentUser } from 'firebase/auth'
import Home from './pages/Home';
import MyCalendar from './pages/MyCalendar';
import CreateEvent from './pages/CreateEvent';
import NearbyEvents from './pages/NearbyEvents';
import EventDetails from './pages/EventDetails';
import EditEvent from './pages/EditEvent';
import Login from './pages/Login';
import Register from './pages/Register';

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
  this.getEvents()
}


getEvents = async () => {
  const eventsCollection = collection(db, 'Events');
  const events = await getDocs(eventsCollection);
  const eventsArr = [];
  events.forEach(individualEvent => {
    console.log('individualEvent', individualEvent.data())
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

login = async existingUser => {
    try{
      const auth = getAuth();
      const data = await signInWithEmailAndPassword(
        auth,
        existingUser.email,
        existingUser.password
      );

      this.setState({
        user: data.user
      }, () => this.props.history.push('/'))
    } catch(error){

      console.log('error:', error)
    }
  }


logout = () => {
  try {
    const auth = getAuth();
    signOut(auth)
    .then(() => {
      this.setState({
        user: null
      }, () => this.props.history.push('/login'))
    })
  }
  catch(error){
    console.log('error:', error)
  }
}

register = async newUser => {
    try{
      const auth = getAuth();
      const data = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      this.setState({
        user: data.user
      }, () => this.props.history.push('/puppies'))
    } catch(error){

      console.log('error:', error)
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
        </div>

        <nav>
          <NavLink exact to='/logout'>LOGOUT</NavLink>
          <NavLink exact to='/add-event'>CREATE EVENT</NavLink>
          <NavLink exact to='/events-near-me'>EVENTS NEAR ME</NavLink>

        </nav>
        </>
        )
        :(<>
          <div className="nav-home">
          MY CALENDAR
          </div>
          <nav>
            <NavLink exact to='/login'>SIGNUP/LOGIN</NavLink>
          </nav></>
          )
        }
    </header>
      <main>
      <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
        <Route exact path='/my-calendar'>
          {this.state.user
          ?<MyCalendar events={this.state.events} removeEvent={this.removeEvent}/>
          : <Redirect to={{pathname: '/login'}} />
        }
        </Route>
        <Route exact path='/login'>
          <Login login={this.login} />
        </Route>
        <Route exact path='/register'>
          <Register register={this.register}/>
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
      </Switch>
      </main>
    </div>
  );
}
}
