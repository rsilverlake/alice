import { NgModule } from '@angular/core';
import { AliceLocaleComponent } from './alice-locale.component';
import { TranslatePipe } from './translate.pipe';
import { AliceLocaleService } from './alice-locale.service';



@NgModule({
  declarations: [
    TranslatePipe
  ],
  imports: [
  ],
  exports: [
    TranslatePipe,
  ],
  providers: [
    AliceLocaleService
  ]
})
export class AliceLocaleModule { }
