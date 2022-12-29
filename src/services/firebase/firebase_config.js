import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyAiMmSM6wbCS7KDTmvXhFyBlNreBH2a47A',
  authDomain: 'nurturely-doctor.firebaseapp.com',
  projectId: 'nurturely-doctor',
  storageBucket: 'nurturely-doctor.appspot.com',
  messagingSenderId: '517536057655',
  appId: '1:517536057655:web:8c566bb11c3501fd57b2b2',
  measurementId: 'G-19SPQGTXG7',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
