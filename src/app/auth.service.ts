import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app.user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
	//user$ the $ define that the variable is Observable
	user$: Observable<firebase.User>;

	constructor(
		private afAuth: AngularFireAuth,
		private userService: UserService,
		private route: ActivatedRoute //get the current router and extract it
		) {
		// Async
		this.user$ = afAuth.authState;
	}

	login(){
		//pass the current url to variable returnUrl
		let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
		localStorage.setItem('returnUrl', returnUrl);
		
		//redirect user to Oauth login like Google, Facebook.
		this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
	}

	logOut(){
		this.afAuth.auth.signOut();
	}

	get appUser$(): Observable<AppUser>{
		return this.user$
		.switchMap(user => {
			if(user) return this.userService.get(user.uid)

				return Observable.of(null);
		});
	}
}

