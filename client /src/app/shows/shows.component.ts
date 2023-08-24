import { NumberInput } from '@angular/cdk/coercion';
import { Component,OnInit} from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { MoviesServiceService } from '../movies-service.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
  
})
export class ShowsComponent  {

  constructor(private  api:MoviesServiceService) {}
  totalPages:number = 5670
  pageSize:number =30
  currentpage:number = 1;
  movies:any[]=[];
  ngOnInit():void{
    this.api.getMovies(1,30).subscribe({next:(data:[])=>{
      this.movies = data
      console.log(this.movies)
    }})
  }
  handlePageEvent(event:PageEvent){
    this.currentpage= event.pageIndex +1;
    this.api.getMovies(this.currentpage,30).subscribe({next:(data:[])=>{
      this.movies = data
      console.log(this.movies)
    }})
  }

}