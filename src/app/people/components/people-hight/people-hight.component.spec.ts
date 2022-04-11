import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleHightComponent } from './people-hight.component';

describe('PeopleHightComponent', () => {
  let component: PeopleHightComponent;
  let fixture: ComponentFixture<PeopleHightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleHightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleHightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
