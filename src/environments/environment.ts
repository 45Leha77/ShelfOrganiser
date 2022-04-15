// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import { initializeApp } from "firebase/app";
// import {
//   getFirestore, collection, getDocs
//  } from 'firebase/firestore'
export const environment = {
  firebase: {
    projectId: 'shelf-optimiser',
    appId: '1:694065047164:web:ee56f6f927cd6c35524bf9',
    databaseURL: 'https://shelf-optimiser-default-rtdb.firebaseio.com',
    storageBucket: 'shelf-optimiser.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyAT-Wqo5eKrRV_cDCG-FtIVo_jjr0nBO1k',
    authDomain: 'shelf-optimiser.firebaseapp.com',
    messagingSenderId: '694065047164',
  },
  production: false,
};

// initializeApp(environment.firebase);

// const db = getFirestore();

// const colRef = collection(db, 'books');

// getDocs(colRef)
// .then((snapshot) => {
//   let books: { id: string; }[] = []
//   snapshot.docs.forEach((doc) => {
//     books.push({...doc.data(), id: doc.id})
//   })
//   console.log(books)
// })
// .catch(err => {
//   console.log(err.message)
// })
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
