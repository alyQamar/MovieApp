import { Component ,OnInit,AfterViewInit,OnChanges, SimpleChanges} from '@angular/core';
import { MoviesServiceService } from '../movies-service.service';
import { event } from 'jquery';

@Component({
  selector: 'app-showmovie',
  templateUrl: './showmovie.component.html',
  styleUrls: ['./showmovie.component.css']
})
export class ShowmovieComponent implements OnInit ,AfterViewInit {

  constructor(private api:MoviesServiceService) {}

  movies:any;
  ngOnInit():void{
    this.api.getMovies(1,15).subscribe({next:(data:[])=>{
      this.movies = data
      console.log(this.movies)
      
    }})



  }
  ngAfterViewInit()	{
    this.api.getMovies(1,15).subscribe({next:(data:[])=>{
      this.movies = data
      console.log(this.movies)
    }})

  }


}


