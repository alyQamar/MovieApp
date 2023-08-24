import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  onSignUp(Formdata:NgForm){
    if (Formdata.invalid){
      return;
    }
    console.log(Formdata.value.user+Formdata.value.email+Formdata.value.psw)
  }
}
