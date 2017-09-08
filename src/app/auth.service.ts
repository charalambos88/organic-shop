import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
		//user$ the $ define that the variable is Observable
	user$: Observable<firebase.User>;

	constructor(private afAuth: AngularFireAuth) {
		// Async
		this.user$ = afAuth.authState;
	}

	login(){
		//redirect user to Oauth login like Google, Facebook.
		this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
	}

	logOut(){
		this.afAuth.auth.signOut();
	}
}
