import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {

  constructor(private api:HttpClient) { }
  url_two = "http://localhost:4500"
  url:string = "http://www.localhost:5000"
  TopRated(page:number, size:number):any{
    return this.api.get<any>(`${this.url}/movies?page=${page}&limt=${size}`)
  }
  getMovies(page:number, size:number):any{
    return this.api.get<any>(`${this.url_two}/movies?page=${page}&size=${size}`)
  }
}
