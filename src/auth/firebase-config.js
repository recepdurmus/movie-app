import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyATRrohYBoOp9bQPqMONQEAjHGcHHm08y0",
    authDomain: "movie-9f698.firebaseapp.com",
    projectId: "movie-9f698",
    storageBucket: "movie-9f698.appspot.com",
    messagingSenderId: "976693187919",
    appId: "1:976693187919:web:edeaa9e3692e8a79d7e13a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);