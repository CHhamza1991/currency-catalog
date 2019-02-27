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
import { ListeCurrenciesService } from './liste-currencies.service';

describe('ListeCurrenciesService', () => {
  let service: ListeCurrenciesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListeCurrenciesService
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(ListeCurrenciesService);
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
    expect(environmentMock.environment.listCurrenciesUrl).toBe('http://localhost:3000/data');
    expect(environmentProd.environment.listCurrenciesUrl).toBe('https://restcountries.eu/rest/v2/all');
  });

  it('should perform the correct GET request to get currencies list', () => {
    const headersMock = new HttpHeaders().append('Content-Type', 'application/json');
    service.listCurrenciesUrl = environmentProd.environment.listCurrenciesUrl;

    service.getListCurrencies(new Map<string, any>()).subscribe();

    const req = httpMock.expectOne(service.listCurrenciesUrl);
    expect(req.request.url).toBe('https://restcountries.eu/rest/v2/all');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers).toEqual(headersMock);
  });
});
