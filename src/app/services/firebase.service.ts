import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import {
  collection,
  addDoc,
  getFirestore,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';
import {
  getAuth,
  // createUserWithEmailAndPassword,
  // signOut,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { Book, Movie } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public database: Database) {}

  db = getFirestore();
  auth = getAuth();
  user = this.auth.currentUser;

  getData(docs: string): Promise<Book[]> {
    return getDocs(collection(this.db, docs)).then((snapshot) => {
      let books: any[] = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      return books;
    });
  }

  getSingleDataItem(document: string, id: string): any {
    const docRef = doc(this.db, document, id);
    return getDoc(docRef).then((doc) => {
      let item = { ...doc.data(), id: doc.id };
      return item;
    });
  }

  sendData(
    document: string,
    object: Book | Movie
  ): Promise<DocumentReference<DocumentData>> {
    const colRef = collection(this.db, document);
    return addDoc(colRef, object);
  }

  deleteData(document: string, id: string): any {
    const docRef = doc(this.db, document, id);
    return deleteDoc(docRef).catch((err) => {
      console.log(err);
    });
  }

  updateData(document: string, id: string, obj: {}): Promise<any> {
    const docRef = doc(this.db, document, id);
    return updateDoc(docRef, obj);
  }

  // createUser(email: string, pass: string) {
  //   createUserWithEmailAndPassword(this.auth, email, pass)
  //     .then((cred) => {
  //       console.log('user created', cred.user);
  //       this.isLoggedIn = true;
  //       localStorage.setItem('isLoggedIn', 'true');
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }

  logOut() {
    signOut(this.auth)
      .then((cred) => {
        console.log('User is signed out', cred);
        return cred;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  logIn(email: string, pass: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, pass).then(
      (cred: UserCredential): UserCredential => {
        return cred;
      }
    );
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const user = JSON.parse(userDataString);
      return user;
    }
    return null;
  }

  getAuthError(errCode: string) {
    if (errCode == 'auth/user-not-found') {
      return 'Email does not exist';
    }
    if (errCode == 'auth/wrong-password') {
      return 'Wrong password';
    }
    return 'Unknown error. Try again later';
  }
}
