import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the StringNumberPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'stringNumber',
})
export class StringNumberPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return parseInt(value);
  }
}
