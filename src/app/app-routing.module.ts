import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'create-story-modal',
    loadChildren: () => import('./pages/create-story-modal/create-story-modal.module').then( m => m.CreateStoryModalPageModule)
  },
  {
    path: 'audo-testing',
    loadChildren: () => import('./pages/audo-testing/audo-testing.module').then( m => m.AudoTestingPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
