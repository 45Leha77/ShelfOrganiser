import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

export class AuthService {
//   isLoggedIn = false;
  auth = getAuth();

//   isAuth() {
//     return new Promise<boolean>((resolve, reject) => {
//       setTimeout(() => {
//         resolve(this.isLoggedIn);
//       }, 1000);
//     });
//   }

//   createUser() {
//     let email = 'linuks454@gmail.com';
//     let pass = '147814';
//     createUserWithEmailAndPassword(this.auth, email, pass)
//       .then((cred) => {
//         console.log('user created', cred.user);
//         this.isLoggedIn = true;
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }

//   logOut() {
//     signOut(this.auth)
//       .then((cred) => {
//         console.log('the user is signed out', cred);
//         this.isLoggedIn = false;
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }

//   logIn() {
//     let email = 'linuks454@gmail.com';
//     let pass = '147814';
//     signInWithEmailAndPassword(this.auth, email, pass)
//       .then((cred) => {
//         console.log('user logged in', cred.user);
//         this.isLoggedIn = true;
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }

//   lookAfterStatus() {
//     onAuthStateChanged(this.auth, (user) => {
//       console.log('user status changes', user);
//       console.log('Loged in:',this.isLoggedIn)
//     });
//   }
}
