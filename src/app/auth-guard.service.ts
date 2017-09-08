import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state:RouterStateSnapshot){
  	//map => transform from user object into a boolean
  	//cant use subscribe because the state is false or true only
  	return this.auth.user$.map(user => {
  		//check if user exist then return true
  		if (user) return true;

  		//else navigate to login page
  		this.router.navigate(['/login'], { queryParams: {returnUrl: state.url }});
  		return false;
  	});
  }
}
