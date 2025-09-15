import { TestBed } from '@angular/core/testing';

import { PaisesServicio } from './paises-servicio';

describe('PaisesServicio', () => {
  let service: PaisesServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaisesServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
