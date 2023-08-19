import { Component ,HostListener, Renderer2 } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
 
})
export class NavbarComponent {

 
  @HostListener('window:scroll')
  onWindowScroll() {
    const nav :HTMLElement|null = document.querySelector('nav');
    const items :any = document.querySelectorAll('.nav-link');
    if (window.pageYOffset > 100) {
      nav?.classList.add('hamda',);
      items.forEach((element:HTMLElement) => {
        element?.classList.replace('text-white','text-dark');
      });

    } else {
      nav?.classList.remove('hamda', );
      items.forEach((element:HTMLElement) => {
        element?.classList.replace('text-dark','text-white');

      });
    }
  }
  // isNavbarScrolled: boolean = false;
  // constructor(private renderer: Renderer2) {}

  // @HostListener('window:scroll')
  // onWindowScroll() {
  //   if (window.pageYOffset > 100) {
  //     this.isNavbarScrolled = true;
  //     this.addClassesToNavbar();
  //   } else {
  //     this.isNavbarScrolled = false;
  //     this.removeClassesFromNavbar();
  //   }
  // }

  // private addClassesToNavbar() {
  //   const nav = document.querySelector('nav');
  //   this.renderer.addClass(nav, 'bg-dark');
  //   this.renderer.addClass(nav, 'shadow');
  // }

  // private removeClassesFromNavbar() {
  //   const nav = document.querySelector('nav');
  //   this.renderer.removeClass(nav, 'bg-dark');
  //   this.renderer.removeClass(nav, 'shadow');
  // }

  }


