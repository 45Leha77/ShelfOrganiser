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
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
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
  isLoggedIn = this.isActiveSession();

  isActiveSession(): boolean {
    if (sessionStorage.getItem('isLoggedIn')) {
      return true;
    }
    return false;
  }

  getData(docs: string): any {
    return getDocs(collection(this.db, docs))
      .then((snapshot) => {
        let books: any[] = [];
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        return books;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  getSingleDataItem(document: string, id: string): any {
    const docRef = doc(this.db, document, id);
    return getDoc(docRef).then((doc) => {
      let item = { ...doc.data(), id: doc.id };
      return item;
    });
  }

  sendData(document: string, object: Book | Movie): any {
    const colRef = collection(this.db, document);
    return addDoc(colRef, object).catch((err) => {
      console.log(err.message);
    });
  }

  deleteData(document: string, id: string): any {
    const docRef = doc(this.db, document, id);
    return deleteDoc(docRef).catch((err) => {
      console.log(err);
    });
  }

  updateData(document: string, id: string, obj: {}): any {
    const docRef = doc(this.db, document, id);
    updateDoc(docRef, obj).catch((err) => {
      console.log(err);
    });
  }

  isAuth() {
    return new Promise<boolean>((resolve, reject) => {
      resolve(this.isLoggedIn);
    });
  }

  createUser(email: string, pass: string) {
    createUserWithEmailAndPassword(this.auth, email, pass)
      .then((cred) => {
        console.log('user created', cred.user);
        this.isLoggedIn = true;
        sessionStorage.setItem('isLoggedIn', 'true');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  logOut() {
    signOut(this.auth)
      .then((cred) => {
        console.log('the user is signed out', cred);
        this.isLoggedIn = false;
        sessionStorage.removeItem('isLoggedIn');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  logIn(email: string, pass: string) {
    // let email = 'linuks454@gmail.com';
    // let pass = '147814';
    return signInWithEmailAndPassword(this.auth, email, pass).then((cred) => {
      this.isLoggedIn = true;
      sessionStorage.setItem('isLoggedIn', 'true');
    });
  }

  lookAfterStatus() {
    return onAuthStateChanged(this.auth, (user) => {
      console.log('user status changes', user);
    });
  }
}
