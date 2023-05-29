import { Pipe, PipeTransform } from '@angular/core';
import { AliceLocaleService } from './alice-locale.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  private localeService: AliceLocaleService;

  constructor(localeService: AliceLocaleService) {
    this.localeService = localeService;
  }
  

  transform(value: string, ...args: any[]): string {
    var translated = this.localeService.translate(value, args);
    return translated;
  }

}
