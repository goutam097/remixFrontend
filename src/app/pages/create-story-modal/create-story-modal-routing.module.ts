import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateStoryModalPage } from './create-story-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateStoryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateStoryModalPageRoutingModule {}
