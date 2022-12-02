import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayAreaComponent } from './modules/view-module/components/play-area/play-area.component';

const routes: Routes = [
  { path: '', component: PlayAreaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
