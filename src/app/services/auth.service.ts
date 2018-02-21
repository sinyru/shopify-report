import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  public user: boolean = false;
  constructor(private authentication: AngularFireAuth, private router: Router) {
  }

  loginWithEmail(email, password) {
    this.authentication.auth.signInWithEmailAndPassword(email, password)
    .then((res)=>{
      this.user = true;
      this.router.navigate(['home'])
    })
    .catch(res=>{
      this.user = false;
    });
  }

  logOut() {
    this.authentication.auth.signOut();
    this.user = false;
    this.router.navigate([''])
  }
}
