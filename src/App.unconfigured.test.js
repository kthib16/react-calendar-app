import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./firebase', () => ({ db: {}, auth: null, isFirebaseConfigured: false }));
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

test('explains how to configure Firebase when no API key is set', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole('alert')).toHaveTextContent(/firebase is not configured/i);
  expect(screen.getByRole('heading', { name: /welcome to my calendar app/i })).toBeInTheDocument();
});
