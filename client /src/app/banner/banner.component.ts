import { Component , OnInit } from '@angular/core';
import { MoviesServiceService } from '../movies-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  constructor(private  api:MoviesServiceService) {}
  movies:any[]=[];
  ngOnInit():void{
    this.api.TopRated(1,20).subscribe({next:(data:[])=>{
      this.movies = data
    }})
  }

}
