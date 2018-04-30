import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CargaCreditoPage } from './carga-credito';

@NgModule({
  declarations: [
    CargaCreditoPage,
  ],
  imports: [
    IonicPageModule.forChild(CargaCreditoPage),
  ],
})
export class CargaCreditoPageModule {}
