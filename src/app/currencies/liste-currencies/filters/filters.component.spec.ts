/* Dépendences fonctionnelles internes d'Angular */
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';

/* Services */
import { FiltersService } from './services/filters.service';

/* Components */
import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltersComponent
      ],
      providers: [
        FiltersService,
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 mat-form-field', () => {
    const els = fixture.debugElement.queryAll(By.css('mat-form-field'));
    expect(els.length).toEqual(2);
  });

  it('should have a mat-select filed', () => {
    const el = fixture.debugElement.query(By.css('mat-select'));
    expect(el).toBeDefined();
  });

  it('should have an input filed', () => {
    const el = fixture.debugElement.query(By.css('input'));
    expect(el).toBeDefined();
  });

  it('should create a form with 2 controls', () => {
    expect(component.filtersFormGroup.contains('filterValue')).toBeTruthy();
    expect(component.filtersFormGroup.contains('filterCriteria')).toBeTruthy();
  });

  it('should make the filterCriteria control required', () => {
    const control = component.filtersFormGroup.get('filterCriteria');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should make the filterValue control disabled if filterCriteria is invalid', () => {
    const controlCriteria = component.filtersFormGroup.get('filterCriteria');
    const controlValue = component.filtersFormGroup.get('filterValue');

    controlCriteria.setValue('');

    expect(controlValue.disabled).toBeTruthy();
  });

  it('should enable make the filterValue control once filterCriteria is valid', () => {
    const controlCriteria = component.filtersFormGroup.get('filterCriteria');
    const controlValue = component.filtersFormGroup.get('filterValue');

    controlCriteria.setValue('xxx');

    expect(controlValue.enabled).toBeTruthy();
  });

  it('should trigger filtering on click on search-icon button', () => {
    const button = fixture.debugElement.query(By.css('.filters__button-filtrer'));
    const filtersService = TestBed.get(FiltersService);
    const spy = spyOn(component, 'filterCurrencies');

    button.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalled();
  });

  it('should reset filters on click on trash-icon button ', () => {
    const button = fixture.debugElement.query(By.css('.filters__button-reset'));
    const filtersService = TestBed.get(FiltersService);
    const spy = spyOn(component, 'reset');

    button.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalled();
  });
});
