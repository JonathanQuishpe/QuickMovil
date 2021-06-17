import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContratoPage } from './contrato.page';

const routes: Routes = [
  {
    path: '',
    component: ContratoPage
  },
  {
    path: 'finalizado',
    loadChildren: () => import('./finalizado/finalizado.module').then(m => m.FinalizadoPageModule)
  },
  {
    path: 'transito',
    loadChildren: () => import('./transito/transito.module').then(m => m.TransitoPageModule)
  },
  {
    path: 'aprobar/:id',
    loadChildren: () => import('./aprobar/aprobar.module').then(m => m.AprobarPageModule)
  },
  {
    path: 'contratar/:id',
    loadChildren: () => import('./contratar/contratar.module').then(m => m.ContratarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratoPageRoutingModule { }
