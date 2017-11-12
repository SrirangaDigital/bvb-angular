import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TocComponent } from './toc/toc.component';
import { ArticlesComponent } from './articles/articles.component';
import { AuthorsComponent } from './authors/authors.component';

@NgModule({
  declarations: [
    AppComponent,
    TocComponent,
    ArticlesComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
