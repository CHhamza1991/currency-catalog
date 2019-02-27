/* Dépendences fonctionnelles internes d'Angular */
import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import * as  environmentMock from '../../../../environments/environment.mock';
import * as  environmentProd from '../../../../environments/environment.prod';

/* Services */
import { CurrencyDetailsService } from './currency-details.service';
import { UrlFormatter } from '../../../shared/services/url-formatter';

describe('CurrencyDetailsService', () => {
  let service: CurrencyDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrencyDetailsService
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(CurrencyDetailsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    /**
     * Pour être sûr qu'aucune requête ne soit suspendu ou en cours après chaque test
     */
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use a valid requests parameters', () => {
    expect(environmentMock.environment.currencyDetailsUrl).toBe('http://localhost:3000/data');
    expect(environmentProd.environment.currencyDetailsUrl).toBe('https://restcountries.eu/rest/v2/currency/{}');
  });

  it('should perform the correct GET request to get currency details', () => {
    const headersMock = new HttpHeaders().append('Content-Type', 'application/json');
    service.currencyDetailsUrl = environmentProd.environment.currencyDetailsUrl;

    service.getCurrencyDetails('test').subscribe();

    const req = httpMock.expectOne(new UrlFormatter().format(service.currencyDetailsUrl, 'test'));
    expect(req.request.url).toBe('https://restcountries.eu/rest/v2/currency/test');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers).toEqual(headersMock);
  });
});
