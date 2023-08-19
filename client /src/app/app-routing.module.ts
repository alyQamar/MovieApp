import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BannerComponent } from './banner/banner.component';

const routes: Routes = [
  {path: 'home', component: BannerComponent },
  {path: '', component: BannerComponent },
  {path: 'movies', component: MoviesComponent },
  {path: '**', component: NotfoundComponent },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
