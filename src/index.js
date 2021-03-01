import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

// My web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxZsC51VacFRAtxNkT6hSksY_BpyExlps",
    authDomain: "movies-chat-app-f1f1f1.firebaseapp.com",
    projectId: "movies-chat-app-f1f1f1",
    storageBucket: "movies-chat-app-f1f1f1.appspot.com",
    messagingSenderId: "711802877235",
    appId: "1:711802877235:web:d9d4f2a7ec62af1de07a46"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
