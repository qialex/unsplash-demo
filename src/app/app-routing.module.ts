import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoSingleComponent } from './components';

const routes: Routes = [
  {
    path: 'photo-single/:photoId',
    component: PhotoSingleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
