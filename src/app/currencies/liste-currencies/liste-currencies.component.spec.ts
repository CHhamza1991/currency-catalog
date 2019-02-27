/* Dépendences fonctionnelles internes d'Angular */
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

/* Dépendances RxJS */
import { of } from 'rxjs';

/* Services */
import { FiltersService } from './filters/services/filters.service';
import { ListeCurrenciesService } from './services/liste-currencies.service';

/* Components */
import { ListeCurrenciesComponent } from './liste-currencies.component';

/* Models */
import { Filters } from './filters/filters.model';

describe('ListeCurrenciesComponent', () => {
  let component: ListeCurrenciesComponent;
  let fixture: ComponentFixture<ListeCurrenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListeCurrenciesComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCurrenciesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should intialize an empty filter', () => {
    const filtersService = TestBed.get(FiltersService);
    const spy = spyOn(filtersService, 'getFilters').and.returnValue(new Filters(null, null));

    component.initialiseFilters();

    expect(component.filtersParams.size).toEqual(0);
  });

  it('should intialize a not empty filter', () => {
    const filtersService = TestBed.get(FiltersService);
    const spy = spyOn(filtersService, 'getFilters').and.returnValue(new Filters('code', 'eur'));

    component.initialiseFilters();

    expect(component.filtersParams.size).toEqual(1);
  });

  it('should set currencies property with items returned from server', () => {
    const listeCurrenciesService = fixture.debugElement.injector.get(ListeCurrenciesService);
    const spy = spyOn(listeCurrenciesService, 'getListCurrencies').and.callFake((x) => of([1, 2, 3]));

    component.getListCurrencies();

    expect(component.listcurrencies.length).toEqual(3);
    expect(component.noResult).toBeFalsy();
  });

  it('should output message on when no currencies returned from server', () => {
    const listeCurrenciesService = fixture.debugElement.injector.get(ListeCurrenciesService);
    const spy = spyOn(listeCurrenciesService, 'getListCurrencies').and.callFake((x) => of([]));

    component.getListCurrencies();

    expect(component.noResult).toBeTruthy();
  });

  it('should navigate to currency details page on clicking on a currency card', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.loadDetails({ id: 'x', type: 'y', symbol: 'z' });

    expect(spy).toHaveBeenCalledWith(['/currency', 'x']);
  });

  it('should re-fetch currencies from the server on new filtering values ', () => {
    const listeCurrenciesService = fixture.debugElement.injector.get(ListeCurrenciesService);
    const filtersService = TestBed.get(FiltersService);
    const spyCurrencies = spyOn(listeCurrenciesService, 'getListCurrencies').and.callFake((x) => of([]));
    const spyFilters = spyOn(filtersService, 'saveAll').and.callFake(() => of(new Filters('null', 'null')));

    spyFilters();
    fixture.detectChanges();

    expect(spyCurrencies).toHaveBeenCalled();
  });

});
