import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoxofficePage } from './boxoffice';

@NgModule({
  declarations: [
    BoxofficePage,
  ],
  imports: [
    IonicPageModule.forChild(BoxofficePage),
  ],
})
export class BoxofficePageModule {}
