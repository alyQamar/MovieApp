import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private api:SignupService, private router:Router) {}
  onSignUp(Formdata:NgForm){
    if (Formdata.invalid){
      return;
    }
    const user = Formdata.value.user;
    const email = Formdata.value.email;
    const psw = Formdata.value.psw;
    const psw_1 = Formdata.value.pswrepeat
console.log(user+email+psw+psw_1)

    this.api.singupUser(user,email,psw,psw_1)
      .subscribe({next:(data:any) =>{
        this.router.navigate(['signin']);
      }});
    

  }
}
