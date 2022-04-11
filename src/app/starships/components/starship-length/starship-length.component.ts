import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-starship-length',
  template:`{{ starshipLengthText}}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipLengthComponent implements OnInit {
  @Input() starshipLength: string = '';
  starshipLengthText: String='';

  constructor() { }

  ngOnInit(): void {
    this.mapHeightText();
  }

  mapHeightText() {
    const value = Number(this.starshipLength);
    switch(true){
      case (value> 1000):
        this.starshipLengthText = 'large';
        break;
      case (value< 100):
        this.starshipLengthText = 'small';
        break;
      case (100 < value &&  value< 200):
        this.starshipLengthText = 'normal';
        break;
    }
  }

}
