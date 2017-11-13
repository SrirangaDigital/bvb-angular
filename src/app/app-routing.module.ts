import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Import Router Module
import { ArticlesComponent } from './articles/articles.component';
import { AuthorsComponent } from './authors/authors.component';
import { FeatureComponent } from './feature/feature.component';
import { SeriesComponent } from './series/series.component';

const appRoutes: Routes = [
  { path: 'articles/:articleListType', component: ArticlesComponent },
  { path: 'articles', redirectTo: '/articles/articlesLetterWise?title=@^A', pathMatch: 'full' },
  { path: 'authors/:letter', component: AuthorsComponent },
  { path: 'authors', redirectTo: '/authors/A', pathMatch: 'full' },
  { path: 'features', component: FeatureComponent },
  { path: 'series', component: SeriesComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}