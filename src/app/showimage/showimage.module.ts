import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowimagePageRoutingModule } from './showimage-routing.module';

import { ShowimagePage } from './showimage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowimagePageRoutingModule
  ],
  declarations: [ShowimagePage]
})
export class ShowimagePageModule {}
