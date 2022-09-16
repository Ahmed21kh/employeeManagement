import { Injectable } from '@angular/core';
import {  signInWithEmailAndPassword ,Auth, authState ,createUserWithEmailAndPassword, updateProfile  } from '@angular/fire/auth';

import { from } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { switchMap } from 'rxjs-compat/operators/switchMap';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = authState(this.afAuth);

  constructor(public afAuth:Auth) { }
  login(username:any, password:any){
    return from(signInWithEmailAndPassword(this.afAuth, username, password))
    }
    logout(){
      return from(this.afAuth.signOut())
    }
    signup(name:any , email:any , password:any){
      return from(createUserWithEmailAndPassword(this.afAuth,email,password)).pipe(
        switchMap(({user})=> updateProfile(user, { displayName: name }))
      )
    };
  }

