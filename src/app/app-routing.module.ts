import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Import Router Module
import { TocComponent } from './toc/toc.component';
import { AuthorsComponent } from './authors/authors.component';
import { FeatureComponent } from './feature/feature.component';
import { SeriesComponent } from './series/series.component';

const appRoutes: Routes = [
  { path: 'authors/:letter', component: AuthorsComponent },
  { path: 'toc/:articleListType', component: TocComponent },
  { path: 'features', component: FeatureComponent },
  { path: 'series', component: SeriesComponent },
  { path: 'articles', redirectTo: '/articles/A', pathMatch: 'full' },
  { path: 'authors', redirectTo: '/authors/A', pathMatch: 'full' },
  { path: '**',
    redirectTo: '/'
  }
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