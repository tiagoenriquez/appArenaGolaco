import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesistirReservaPageRoutingModule } from './desistir-reserva-routing.module';

import { DesistirReservaPage } from './desistir-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesistirReservaPageRoutingModule
  ],
  declarations: [DesistirReservaPage]
})
export class DesistirReservaPageModule {}
