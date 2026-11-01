import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { getDocs } from 'firebase/firestore';
import App from './App';

jest.mock('./firebase', () => ({ db: {}, auth: {}, isFirebaseConfigured: true }));

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

const renderApp = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

const emptySnapshot = { forEach: () => {} };

beforeEach(() => {
  getDocs.mockResolvedValue(emptySnapshot);
  onAuthStateChanged.mockImplementation((auth, callback) => {
    callback(null);
    return jest.fn();
  });
});

test('signed-out visitors see the welcome page and a sign-in button', async () => {
  renderApp();
  expect(screen.getByRole('heading', { name: /welcome to my calendar app/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign up \/ log in/i })).toBeInTheDocument();
  await waitFor(() => expect(getDocs).toHaveBeenCalled());
});

test('protected pages redirect signed-out visitors to the login page', async () => {
  renderApp('/my-calendar');
  expect(await screen.findByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
});

test('signed-in users see their navigation and calendar', async () => {
  onAuthStateChanged.mockImplementation((auth, callback) => {
    callback({ email: 'me@example.com', photoURL: 'me.png' });
    return jest.fn();
  });
  renderApp('/my-calendar');
  expect(await screen.findByRole('heading', { name: 'My Calendar' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
});

test('shows an error when events cannot be loaded', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  getDocs.mockRejectedValue(new Error('offline'));
  renderApp();
  expect(await screen.findByRole('alert')).toHaveTextContent(/could not load events/i);
});
