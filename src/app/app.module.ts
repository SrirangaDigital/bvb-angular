import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ArticlesComponent } from './articles/articles.component';
import { AuthorsComponent } from './authors/authors.component';
import { FeatureComponent } from './feature/feature.component';
import { SeriesComponent } from './series/series.component';
import { YearsComponent } from './years/years.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    AuthorsComponent,
    FeatureComponent,
    SeriesComponent,
    YearsComponent,
    SearchComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
