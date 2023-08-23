import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
  
})
export class MovieComponent  implements OnInit{
  

  ngOnInit() {

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

