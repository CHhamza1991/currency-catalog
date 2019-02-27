/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

/* Dépendances RxJS */
import { Observable } from 'rxjs';

/* Services */
import { CurrencyDetailsService } from './currency-details.service';

/* Models */
import { CurrencyDetails } from '../currency-details.model';

@Injectable()
export class CurrencyDetailsResolverService implements Resolve<CurrencyDetails> {

  constructor(private currencyDetailsService: CurrencyDetailsService) { }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * @param route ActivatedRouteSnapshot
   * @param state RouterStateSnapshot
   * @returns observable resolvant les détails du currency
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CurrencyDetails> {
    return this.currencyDetailsService.getCurrencyDetails(route.params['id']);
  }
}
