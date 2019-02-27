/* Dépendences fonctionnelles internes d'Angular */
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

/* Components */
import { CurrencyComponent } from './currency.component';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ID as card title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('ID');
  });

  it('should have 2 sub-title in a card ', () => {
    const els = fixture.debugElement.queryAll(By.css('mat-card-subtitle'));
    expect(els.length).toEqual(2);
  });

  it('should have correct labels in both sub-titles in a card ', () => {
    const els = fixture.debugElement.queryAll(By.css('u'));
    expect(els.length).toEqual(2);
    expect(els[0].nativeElement.textContent).toContain('Type');
    expect(els[1].nativeElement.textContent).toContain('Symbol');
  });
});
