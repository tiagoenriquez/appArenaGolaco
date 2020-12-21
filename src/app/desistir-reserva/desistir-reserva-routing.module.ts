import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesistirReservaPage } from './desistir-reserva.page';

const routes: Routes = [
  {
    path: '',
    component: DesistirReservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesistirReservaPageRoutingModule {}
