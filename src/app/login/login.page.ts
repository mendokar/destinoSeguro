import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public afAuth: AngularFireAuth,private _routEx:Router) { }

  ngOnInit() {
  }

  /**
   * loginwithGoogle
   */
  public loginwithGoogle() {
    this._routEx.navigate(['home']);
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((response:any)=>{
      if(response !== null){
        alert("Bienvenido " + response.user.displayName);
        this._routEx.navigate(['home']);
      }
    }).catch(error =>{
      alert("Error: "+ error);
    });
  }


}
