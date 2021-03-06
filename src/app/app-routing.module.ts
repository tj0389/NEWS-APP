import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    data: {
      preload: true
    }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: {
      preload: true
    }
  },
  {
    path: 'showimage',
    loadChildren: () => import('./showimage/showimage.module').then( m => m.ShowimagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
