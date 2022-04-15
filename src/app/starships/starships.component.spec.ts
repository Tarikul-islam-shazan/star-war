import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipsComponent } from './starships.component';
import { StarshipsService } from './starships.service';
import { MockStarshipService } from '../testing/mock-starship.service'
import { RouterTestingModule } from '@angular/router/testing';
import { SearchService } from '../core/services/search.service';
import { MockSearchService } from '../testing/mock-search.service';
import { StarshipLengthPipe } from './pipes/starship-length.pipe';

describe('StarshipComponent Test', () => {
  let comp: StarshipsComponent;
  let service: StarshipsService;
  let fixture: ComponentFixture<StarshipsComponent>;

  beforeEach(() => {
     TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],

      declarations:[StarshipsComponent, StarshipLengthPipe],
      providers: [
        {
          provide: StarshipsService, useClass: MockStarshipService
        },
        {
          provide: SearchService, useClass: MockSearchService
        },
        {
          provide: ChangeDetectorRef, useValue: true
        }
      ]
    });
    fixture = TestBed.createComponent(StarshipsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StarshipsService);
  });

  it('should starships data length to be 2', () => {
    comp.ngOnInit();
    expect(comp.starships.length).toBe(2);
  })

  it('should Next page no to be 2', () => {
    comp.ngOnInit();
    expect(comp.nextPage).toBe(2);
  })

  it('should previous page no to be 0', () => {
    comp.ngOnInit();
    expect(comp.prevPage).toBe(0);
  })

  it("should contain starship  name 'CR90 corvette'", () => {
    comp.ngOnInit();
    fixture.detectChanges();
    const listDisplay: HTMLElement = fixture.debugElement.nativeElement.querySelector('li');
    expect(listDisplay.innerText).toContain('CR90 corvette');
  })

  it("should  starship  length 'normal'", () => {
    comp.ngOnInit();
    fixture.detectChanges();
    const listDisplay: HTMLElement = fixture.debugElement.nativeElement.querySelector('li');
    expect(listDisplay.innerText).toContain('normal');
  })
});
