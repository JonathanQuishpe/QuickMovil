import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprobarPage } from './aprobar.page';

const routes: Routes = [
  {
    path: '',
    component: AprobarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprobarPageRoutingModule {}
