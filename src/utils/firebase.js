import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCAg53CH9h1vpbxsu_lJA9ET81ShfGaoQI",
    authDomain: "wyr-portfolio.firebaseapp.com",
    projectId: "wyr-portfolio",
    storageBucket: "wyr-portfolio.appspot.com",
    messagingSenderId: "139031453916",
    appId: "1:139031453916:web:f2313440edc5aee8fcd419",
    measurementId: "G-FC6JPHMZEJ"
  };

  firebase.initializeApp(firebaseConfig)

  export const provider = new firebase.auth.EmailAuthProvider();
  export const auth = firebase.auth();
  export default firebase