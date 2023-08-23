import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BannerComponent } from './banner/banner.component';
import { MovieComponent } from './movie/movie.component';
import { TvshowComponent } from './tvshow/tvshow.component';
import { ShowsComponent } from './shows/shows.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';



const routes: Routes = [
  {path: 'home', component: BannerComponent },
  {path: '', component: BannerComponent },
  {path: 'movies', component: MoviesComponent },
  {path: 'movie/:id', component: MovieComponent },
  {path: 'show/:id', component: TvshowComponent },
  {path: 'shows', component: ShowsComponent },
  {path: 'signin', component: SigninComponent },
  {path: 'signup', component: SignupComponent },
  {path: '**', component: NotfoundComponent },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
