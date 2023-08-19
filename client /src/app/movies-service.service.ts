import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {

  constructor(private api:HttpClient) { }
  url:string = "http://localhost:4000"
  TopRated(page:number, size:number):any{
    return this.api.get<any>(`${this.url}/movies?page=${page}&size=${size}`)
  }
}
