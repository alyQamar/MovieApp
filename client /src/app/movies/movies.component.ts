import { Component , OnInit  } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MoviesServiceService } from '../movies-service.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],

})
export class MoviesComponent implements OnInit {
  constructor(private  api:MoviesServiceService) {}

  movies:any[]=[];
  ngOnInit():void{
    this.api.TopRated(1,24).subscribe({next:(data:[])=>{
      this.movies = data
    }})
  }
}
