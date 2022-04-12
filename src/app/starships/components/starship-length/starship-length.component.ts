import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-starship-length',
  template:`{{ starshipLengthText  }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipLengthComponent implements OnInit {
  @Input() starshipLength!: string;
  starshipLengthText: string = '';

  constructor() { }

  ngOnInit(): void {
    this.mapLengthText();
  }

  mapLengthText(): void {
    const value = Number(
      this.starshipLength.includes(',')
      ? this.starshipLength.replace(',','')
      : this.starshipLength
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
  }

}
