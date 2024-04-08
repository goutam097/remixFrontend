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
  {
    path: 'sticker-modal',
    loadChildren: () => import('./pages/sticker-modal/sticker-modal.module').then( m => m.StickerModalPageModule)
  },
  {
    path: 'text-modal',
    loadChildren: () => import('./pages/text-modal/text-modal.module').then( m => m.TextModalPageModule)
  },
  {
    path: 'music-modal',
    loadChildren: () => import('./pages/music-modal/music-modal.module').then( m => m.MusicModalPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
