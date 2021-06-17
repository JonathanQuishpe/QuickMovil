import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoPage } from './estado.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoPage
  },
  {
    path: 'calificar/:id',
    loadChildren: () => import('./calificar/calificar.module').then(m => m.CalificarPageModule)
  },
  {
    path: 'info/:id',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'finalizado',
    loadChildren: () => import('./finalizado/finalizado.module').then( m => m.FinalizadoPageModule)
  },
  {
    path: 'transito',
    loadChildren: () => import('./transito/transito.module').then( m => m.TransitoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoPageRoutingModule { }
