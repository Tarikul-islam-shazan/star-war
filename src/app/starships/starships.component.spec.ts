import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';


import { StarshipsComponent } from './starships.component';
import { StarshipsService } from './starships.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockService } from '../testing/mock-starship.service'

describe('StarshipComponent Test', () => {
  let comp: StarshipsComponent;
  let service: StarshipsService;
  let fixture: ComponentFixture<StarshipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations:[StarshipsComponent],
      providers: [
        StarshipsComponent,
        {
          provide: StarshipsService, useClass: MockService
        },
        {
          provide: ChangeDetectorRef, useValue: true
        }
      ]
    });
    fixture = TestBed.createComponent(StarshipsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StarshipsService);
    //httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    //service = new StarshipsService(httpClientSpy)
  });

  it('should starship data length to be 2', () => {
    comp.ngOnInit();
    expect(comp.starships.length).toBe(2);
  })

  it('should getPageNumber() return 2', () => {
    expect(comp.getPageNumber('https://swapi.dev/api/starships/?page=2')).toBe(2);
  })

});
