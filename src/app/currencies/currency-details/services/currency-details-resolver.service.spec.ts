/* Dépendences fonctionnelles internes d'Angular */
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRouteSnapshot, UrlSegment, Params, Data, Route, ParamMap } from '@angular/router';

/* Dépendences RxJS */
import { of, Subject } from 'rxjs';

/* Services */
import { CurrencyDetailsResolverService } from './currency-details-resolver.service';
import { CurrencyDetailsService } from './currency-details.service';

/* Models */
import { CurrencyDetails } from '../currency-details.model';

export class ActivatedRouteSnapshotMock {
  private subject = new Subject();
  url: UrlSegment[];
  queryParams: Params;
  fragment: string;
  data: Data;
  outlet: string;
  component: string | null;
  readonly routeConfig: Route | null;
  readonly root: ActivatedRouteSnapshot;
  readonly parent: ActivatedRouteSnapshot | null;
  readonly firstChild: ActivatedRouteSnapshot | null;
  readonly children: ActivatedRouteSnapshot[];
  readonly pathFromRoot: ActivatedRouteSnapshot[];
  readonly paramMap: ParamMap;
  readonly queryParamMap: ParamMap;
  toString() {
    return '';
  }
  get params() {
    return this.subject.asObservable();
  }

  public push(value) {
    this.subject.next(value);
  }
}

describe('CurrencyDetailsResolverService', () => {
  let currencyDetailsResolverService: CurrencyDetailsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrencyDetailsResolverService,
        CurrencyDetailsService,
        { provide: ActivatedRouteSnapshot, useClass: ActivatedRouteSnapshotMock }
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ]
    });
    currencyDetailsResolverService = TestBed.get(CurrencyDetailsResolverService);
  });

  it('should be created', () => {
    expect(currencyDetailsResolverService).toBeTruthy();
  });

  it('should resolve currencyDetails from CurrencyDetailsService', () => {
    const currencyDetailsService = TestBed.get(CurrencyDetailsService);
    const spy = spyOn(currencyDetailsService, 'getCurrencyDetails').and.returnValue(of({ id: 'hamza' } as CurrencyDetails));
    const route: ActivatedRouteSnapshotMock = TestBed.get(ActivatedRouteSnapshot);
    route.push('test');

    currencyDetailsResolverService.resolve(route, null)
      .subscribe(
        (currencyDetails) => {
          expect(spy).toHaveBeenCalledTimes(1);
          expect(currencyDetails).toEqual({ id: 'hamza' } as CurrencyDetails);
        }
      );
  });
});
