import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowimagePage } from './showimage.page';

const routes: Routes = [
  {
    path: '',
    component: ShowimagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowimagePageRoutingModule {}
