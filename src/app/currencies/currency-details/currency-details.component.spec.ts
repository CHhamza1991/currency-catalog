/* Dépendences fonctionnelles internes d'Angular */
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

/* Dépendences RxJS */
import { Subject } from 'rxjs';

/* Components */
import { CurrencyDetailsComponent } from './currency-details.component';

/* Models */
import { CurrencyDetails } from './currency-details.model';

class ActivatedRouteStub {
  private subject = new Subject();
  push(value: any): void {
    this.subject.next(value);
  }

  get data() {
    return this.subject.asObservable();
  }

}
describe('CurrencyDetailsComponent', () => {
  let component: CurrencyDetailsComponent;
  let fixture: ComponentFixture<CurrencyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CurrencyDetailsComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ID as card title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-title')).toBeDefined();
  });

  it('should trigger backToCurrencies() on click on the link', () => {
    const de = fixture.debugElement;
    const button = de.query(By.css('a'));
    const spy = spyOn(component, 'backToCurrencies');

    button.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should navigate to currencies list page on clicking on the link', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.backToCurrencies();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['/']);
  });

  it('should currency details from the data of the route', () => {
    expect(component.chargement).toBeTruthy();
    const route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({
      currency: { id: 'test' } as CurrencyDetails
    });

    route.data.subscribe(
      () => {
        expect(component.currencyDetails).toEqual({ id: 'test' } as CurrencyDetails);
        expect(component.chargement).toBeFalsy();
      }
    );
  });

});
