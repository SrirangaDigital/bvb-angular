import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Import Router Module
import { TocComponent } from './toc/toc.component';
import { ArticlesComponent } from './articles/articles.component';

const appRoutes: Routes = [
  { path: 'articles/:letter', component: ArticlesComponent },
  { path: 'toc/:volume/:part', component: TocComponent },
  { path: 'articles', redirectTo: '/articles/A', pathMatch: 'full' },
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