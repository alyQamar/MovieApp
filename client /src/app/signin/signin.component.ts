import { Component ,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent  implements OnInit{
onSignIn(Formdata: NgForm) {

    if(Formdata.invalid){
      return;
    }
    console.log(Formdata.value.userName)
}

  ngOnInit(): void {

  }

}
