import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'milleSep'
})
export class MilleSeparator implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(str) {
    if (str) {
      return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return str;
  }
}