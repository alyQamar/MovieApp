import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = "http://localhost:5000"
  constructor(private api:HttpClient) { }
  loginUser(email:string , pass:string ):Observable<any>{
    const payload = {
      "email":email,
      "password":pass
    }
    return this.api.post(`${this.url}/auth/login`,payload);
  }

  
}
