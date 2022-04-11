import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-hight',
  template:`{{ heightText}}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleHightComponent implements OnInit {
  @Input() peopleheight: string = '';
  heightText: String='';

  constructor() { }

  ngOnInit(): void {
    this.mapHeightText();
  }

  mapHeightText() {
    const value = Number(this.peopleheight);
    switch(true){
      case (value> 200):
        this.heightText = 'high';
        break;
      case (value< 100):
        this.heightText = 'low';
        break;
      case (100 < value &&  value< 200):
        this.heightText = 'normal';
        break;
    }
  }

}
