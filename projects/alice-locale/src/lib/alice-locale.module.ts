import { NgModule } from '@angular/core';
import { AliceLocaleComponent } from './alice-locale.component';
import { TranslatePipe } from './translate.pipe';



@NgModule({
  declarations: [
    AliceLocaleComponent,
    TranslatePipe
  ],
  imports: [
  ],
  exports: [
    AliceLocaleComponent
  ]
})
export class AliceLocaleModule { }
