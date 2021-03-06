import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB1YNk362sVYhuOAYybT3rivq9ftUk4BqY",
    authDomain: "react-on-line-invoicing.firebaseapp.com",
    projectId: "react-on-line-invoicing",
    storageBucket: "react-on-line-invoicing.appspot.com",
    messagingSenderId: "682393815385",
    appId: "1:682393815385:web:11f7d3691363da77ad2448"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('Logged in');
        let email = user.email;
        let emailVerified = user.emailVerified;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        console.log(user);
        console.log(email);
        console.log(emailVerified);
        console.log(isAnonymous);
        console.log(uid);

        firebase.auth().currentUser.getIdToken()
        .then((token)=> {
            console.log(token);
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('username', email);
        })
    }
    else {
        console.log('Logged out')
    }
});

export default firebase;
export const auth = firebase.auth();