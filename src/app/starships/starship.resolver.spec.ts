import { TestBed } from '@angular/core/testing';

import { StarshipResolver } from './starship.resolver';

describe('StarshipResolver', () => {
  let resolver: StarshipResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StarshipResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
