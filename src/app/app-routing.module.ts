import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./administracion/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./administracion/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'informacion',
    loadChildren: () => import('./administracion/informacion/informacion.module').then(m => m.InformacionPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./sitio/perfil/editar/editar.module').then(m => m.EditarPageModule)
  },
  {
    path: 'foto',
    loadChildren: () => import('./sitio/perfil/foto/foto.module').then(m => m.FotoPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./sitio/perfil/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'categorias',
    loadChildren: () => import('./sitio/servicios/categorias/categorias.module').then(m => m.CategoriasPageModule)
  },
  {
    path: 'estado',
    loadChildren: () => import('./sitio/servicios/estado/estado.module').then(m => m.EstadoPageModule)
  },
  {
    path: 'contrato',
    loadChildren: () => import('./sitio/servicios/contrato/contrato.module').then(m => m.ContratoPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./administracion/logout/logout.module').then(m => m.LogoutPageModule)
  },
  {
    path: 'modal/:id',
    loadChildren: () => import('./administracion/modal/modal.module').then(m => m.ModalPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./administracion/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
