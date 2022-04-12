import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipLengthComponent } from './starship-length.component';


describe('StarshipLengthComponent', () => {
  let component: StarshipLengthComponent;
  let fixture: ComponentFixture<StarshipLengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarshipLengthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});



