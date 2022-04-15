import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peopleHeight'
})
export class PeopleHeightPipe implements PipeTransform {
  private heightText: string = '';

  transform(height: string): string {
    const value = Number(height);
    switch(true){
      case (value> 200):
        this.heightText = 'high';
        break;
      case (value< 100):
        this.heightText = 'low';
        break;
      case (100 <= value &&  value<= 200):
        this.heightText = 'normal';
        break;
    }
    return this.heightText;
  }

}
