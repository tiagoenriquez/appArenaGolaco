import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro-usuario',
    loadChildren: () => import('./cadastro-usuario/cadastro-usuario.module').then( m => m.CadastroUsuarioPageModule)
  },
  {
    path: 'lista-reservas',
    loadChildren: () => import('./lista-reservas/lista-reservas.module').then( m => m.ListaReservasPageModule)
  },
  {
    path: 'cadastro-reserva',
    loadChildren: () => import('./cadastro-reserva/cadastro-reserva.module').then( m => m.CadastroReservaPageModule)
  },
  {
    path: 'desistir-reserva',
    loadChildren: () => import('./desistir-reserva/desistir-reserva.module').then( m => m.DesistirReservaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
