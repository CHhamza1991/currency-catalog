/* Dépendences fonctionnelles internes d'Angular */
import { TestBed } from '@angular/core/testing';

import { FiltersService } from './filters.service';
import { Filters } from '../filters.model';

describe('FiltersService', () => {
  let service: FiltersService;
  const criterias = [
    {
      value: 'code',
      viewValue: 'Code'
    },
    {
      value: 'name',
      viewValue: 'Name'
    },
    {
      value: 'id',
      viewValue: 'ID'
    },
    {
      value: 'currency_type',
      viewValue: 'Type'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FiltersService
      ]
    });
    service = TestBed.get(FiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have all filtering criterias', () => {
    expect(service.criterias).toEqual(criterias);
  });

  it('should save the filters and emit the new value', () => {
    const filtersMock = new Filters('hamza', 'chaabani');

    service.saveAll(filtersMock);

    service.filterSubject.subscribe(
      (filters) => expect(filters).toEqual(filtersMock)
    );
  });
});
