import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprobarPageRoutingModule } from './aprobar-routing.module';

import { AprobarPage } from './aprobar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AprobarPageRoutingModule
  ],
  declarations: [AprobarPage]
})
export class AprobarPageModule { }
