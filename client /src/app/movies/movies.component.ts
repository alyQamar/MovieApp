import { Component , OnInit ,OnChanges } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MoviesServiceService } from '../movies-service.service';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],

})
export class MoviesComponent implements OnInit{
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
