import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private api:HttpClient) { }

  url:string = "http://localhost:5000"
 
  singupUser(name:string, email:string , password:string , passwordConfirm:string ):Observable<any>{
    const payload = {
      "name":name,
      "email":email,
      "password":password,
      "passwordConfirm":passwordConfirm
    }
    return this.api.post(`${this.url}/auth/signup`,payload);
  }
}
