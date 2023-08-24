import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
  
})
export class MovieComponent  implements OnInit{
  movie:Object|any;
  videos:any;
  video?:string;
  constructor(private api:MovieService,private route:ActivatedRoute) { }
  ngOnInit() {
    let id= parseInt(this.route.snapshot.paramMap.get('id')!);
    this.api.getMovie(id).subscribe({next:(data:any)=>{
      this.movie = data

    }})

    // this.api.getVideo(id).subscribe({next:(data:any)=>{
    //   this.videos = data
    //  const value   =  Object.keys(this.videos[0]) as unknown as string;
    //   this.video = this.videos[0][value]

    // }})






    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.setAttribute('style','z-index: 1000; position: fixed;top: 0;width: 100%;  height: 100%;  background-color: rgba(0, 0, 0, .8);  display: none;')
    document.body.appendChild(lightbox);

    const images = document.querySelectorAll('.img-fluid') as any;  // Replace '.image-class' with your desired class name
    images.forEach((image: HTMLImageElement) => {
      image.addEventListener('click', (e: MouseEvent) => {
        lightbox.append('style','align-items: center; justify-content: center; display: flex;')
        const img = document.createElement('img');
        img.src = image.src
        console.log(image.innerHTML)
        while (lightbox.firstChild) {
          lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(img);
      });
    });

    lightbox.addEventListener('click', (e: MouseEvent) => {
      if (e.target !== e.currentTarget) return;
      lightbox.classList.remove('active');
    });
  

}
}

