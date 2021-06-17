import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratarPageRoutingModule } from './contratar-routing.module';

import { ContratarPage } from './contratar.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratarPageRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule
  ],
  declarations: [ContratarPage]
})
export class ContratarPageModule { }
