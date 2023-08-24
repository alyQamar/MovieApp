import { Component ,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent  implements OnInit{
  constructor(private api:UserService, private router:Router) {}
onSignIn(Formdata: NgForm ) {

    if(Formdata.invalid){
      return;
    }
    const pass =Formdata.value.userPassword;
    const user =Formdata.value.userName;
    this.api.loginUser(user,pass)
      .subscribe({next:(data:any) =>{
        this.router.navigate(['movies']);
        console.log("done")
      }});
    
    
}

  ngOnInit(): void {


  }

}
