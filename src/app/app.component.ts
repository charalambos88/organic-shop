import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(
		private auth: AuthService, 
		router:Router,
		private userService: UserService
		) {
		// if subscribed then must de-subscribed sometime
		auth.user$.subscribe(user =>{
			if(!user) return
				//if user exist then
			userService.save(user);

			let returnUrl = localStorage.getItem('returnUrl');
			if(!returnUrl) return;

			localStorage.removeItem('returnUrl');
			router.navigateByUrl(returnUrl);
		});
	}
}
