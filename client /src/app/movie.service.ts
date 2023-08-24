import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private api:HttpClient) { }
  url_two = "http://localhost:4500"
  url:string = "http://www.localhost:5000"
  getMovie(id:Number):any{
    return this.api.get<any>(`${this.url_two}/movie/${id}`)
  }
  getVideo(id:Number):any{
    return this.api.get<any>(`${this.url_two}/video/${id}`)
  }
}
