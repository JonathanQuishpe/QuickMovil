import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizadoPage } from './finalizado.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizadoPageRoutingModule {}
