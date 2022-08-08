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
  Firestore,
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
import { Auth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public database: Database) {}

  db: Firestore = getFirestore();
  auth: Auth = getAuth();
  user: User | null = this.auth.currentUser;

  getData(docs: string): Observable<Book[]> {
    let books: Observable<Book[]>;
    books = from(
      getDocs(collection(this.db, docs)).then((snapshot) => {
        let books: any[] = [];
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        return books;
      })
    );
    return books;
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
  ): Observable<DocumentReference<DocumentData>> {
    const colRef = collection(this.db, document);
    return from(addDoc(colRef, object));
  }

  deleteData(document: string, id: string): Observable<void> {
    const docRef = doc(this.db, document, id);
    return from(
      deleteDoc(docRef).catch((err) => {
        console.log(err);
      })
    );
  }

  updateData(document: string, id: string, obj: {}): Observable<any> {
    const docRef = doc(this.db, document, id);
    return from(updateDoc(docRef, obj));
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

  logOut(): void {
    signOut(this.auth)
      .then((cred) => {
        console.log('User is signed out', cred);
        return cred;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  logIn(email: string, pass: string): Observable<UserCredential> {
    let credentials: Observable<UserCredential>;
    credentials = from(
      signInWithEmailAndPassword(this.auth, email, pass).then(
        (cred: UserCredential): UserCredential => {
          return cred;
        }
      )
    );
    return credentials;
  }

  setUserInLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalStorage(): User | null {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const user: User = JSON.parse(userDataString);
      return user;
    }
    return null;
  }

  getAuthError(errCode: string): string {
    if (errCode == 'auth/user-not-found') {
      return 'Email does not exist';
    }
    if (errCode == 'auth/wrong-password') {
      return 'Wrong password';
    }
    return 'Unknown error. Try again later';
  }
}
