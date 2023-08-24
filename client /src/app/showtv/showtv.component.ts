import { Component ,OnInit} from '@angular/core';
import { MoviesServiceService } from '../movies-service.service';

@Component({
  selector: 'app-showtv',
  templateUrl: './showtv.component.html',
  styleUrls: ['./showtv.component.css']
})
export class ShowtvComponent implements OnInit {
  constructor(private api:MoviesServiceService) {}
  movies:any;
  ngOnInit():void{
    this.api.getMovies(2,24).subscribe({next:(data:[])=>{
      this.movies = data
      console.log(this.movies)
    }})



  }
}
