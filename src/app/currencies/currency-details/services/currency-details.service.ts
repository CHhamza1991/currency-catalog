/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

/* Dépendances RxJS */
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/* Services */
import { UrlFormatter } from '../../../shared/services/url-formatter';

/* Models */
import { CurrencyDetails } from '../currency-details.model';


const headers = new HttpHeaders().append('Content-Type', 'application/json');

@Injectable()
export class CurrencyDetailsService {

  public currencyDetailsUrl = environment.currencyDetailsUrl;

  constructor(private http: HttpClient) { }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * @param currencyId id du currency
   * @returns observable contenant les détails du currency
   */
  getCurrencyDetails(currencyId: string): Observable<CurrencyDetails> {

    const urlFormatter = new UrlFormatter();
    const url = urlFormatter.format(this.currencyDetailsUrl, currencyId);

    /* appel au backend */
    return this.http
      .get<any>(url, { headers: headers })
      .pipe(
        map(
          (result) => {
            /**
             * Approximation des résultat au format attendu
             */
            return result.map(res => {
              return {
                id: res.currencies[0].code,
                attributes: {
                  code: res.currencies[0].code,
                  name: res.currencies[0].name,
                  currency_type: 'national',
                  code_iso_numeric3: res.numericCode,
                  code_iso_alpha3: res.alpha3Code,
                  symbol: res.currencies[0].symbol,
                  native_symbol: res.currencies[0].symbol,
                  category: 'others'
                }
              };
            });
          }),
        map(
          (result) => {
            /**
             * Résoudre temporairement le problème de retourner toute une liste d'objet pour certains currencies comme 'eur'
             */
            return result[0];
          }
        ),
        catchError(this.handleError<CurrencyDetails>('getCurrencyDetails'))
      );
  }

  /**
         * n'interrompe pas l'exécution de l'application si la requête HTTP retourne une erreur
         * @param operation - nom de l'opération
         * @param result - valeur optionnelle à retourner comme observable
         */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // on peut simplement retourner un resultat vide si on n'a pas de traitement specifique.
      return of(result as T);
    };
  }
}
