import { Component , OnInit } from '@angular/core';
import { MoviesServiceService } from '../movies-service.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {
  constructor(private  api:MoviesServiceService) {}
  all_movies:any;
  ngOnInit():void{
    // this.api.TopRated(1,6).subscribe({next:(data:[])=>{
    //   this.movies = data
    //   console.log(this.movies.data)
    // }})

    this.api.getMovies(1,15).subscribe({next:(data:any)=>{
      this.all_movies = data
    }})



  }

  

}
