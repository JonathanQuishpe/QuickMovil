import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasPage } from './categorias.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasPage
  },
  {
    path: 'proveedor/:id',
    loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasPageRoutingModule { }
