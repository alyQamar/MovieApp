import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './movies/movies.component';
import { TvshowComponent } from './tvshow/tvshow.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MovieComponent } from './movie/movie.component';
import { ShowsComponent } from './shows/shows.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VdoPlayerComponent } from './vdo-player/vdo-player.component';
import { FormsModule } from '@angular/forms';
import { VgCoreModule, } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FooterComponent } from './footer/footer.component';
import { ShowmovieComponent } from './showmovie/showmovie.component';
import { ShowtvComponent } from './showtv/showtv.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    MoviesComponent,
    TvshowComponent,
    NotfoundComponent,
    MovieComponent,
    ShowsComponent,
    VdoPlayerComponent,
    SigninComponent,
    SignupComponent,
    FooterComponent,
    ShowmovieComponent,
    ShowtvComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule,
    FontAwesomeModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatPaginatorModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
