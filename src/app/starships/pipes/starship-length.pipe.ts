import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starshipLength'
})
export class StarshipLengthPipe implements PipeTransform {
  starshipLengthText: string = '';

  transform(starshipLength: string): unknown {
    const value = Number(
      starshipLength.includes(',')
      ? starshipLength.replace(',','')
      : starshipLength
    );
    switch(true){
      case (value> 1000):
        this.starshipLengthText = 'large';
        break;
      case (value< 100):
        this.starshipLengthText = 'small';
        break;
      case (100 <= value &&  value <= 1000):
        this.starshipLengthText = 'normal';
        break;
    }
    return this.starshipLengthText;
  }

}
