/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

/* Dépendances RxJS */
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/* Models */
import { Currency } from '../currency.model';


const headers = new HttpHeaders().append('Content-Type', 'application/json');

@Injectable()
export class ListeCurrenciesService {

  public listCurrenciesUrl = environment.listCurrenciesUrl;

  constructor(private http: HttpClient) { }

  /**
   * @returns liste des currencies
   * @version 1.0.0
   * @param listeParams liste des paramètres de récupération des currencies
   *  Exemple:
   * -numéro de page pour la pagination
   * -nombre d'item par page
   * -nombre total des items
   * -les parametres de filtrage des données (key, value)
   */
  getListCurrencies(listeParams: Map<string, any>): Observable<Currency[]> {


    /* construction de l'objet params à partir de la liste réçue en argument */
    let requestParams = new HttpParams();

    /**
     * Définir les request param correspondant aux filtres et pagination indiqués dans le frontend.
     * Une simulation du filtrage est assurée en mode mock
     */
    listeParams.forEach((value, key) => requestParams = requestParams.append(key, value.toString()));

    /* appel au backend */
    return this.http.get<any>(this.listCurrenciesUrl, { headers: headers, params: requestParams })
      .pipe(
        map(
          (result) => {
            /**
             * Extraire tout les currencies de chaque pays
             */
            return result.map(res => {
              return res.currencies;
            });
          }),
        map(
          (result) => {
            /**
             * Applatir l'array des currencies avec une profondeur élévée mis à 15
             * pour garantir avoir tout applatir
             */
            return result.flat(15);
          }),
        map(
          (currencies) => {
            return currencies.map(currency => {
              return {
                id: currency.code,
                type: 'national', /* donnée mock pour servir le template, puisque type non remontée par l'API */
                symbol: currency.symbol
              };
            });
          }),
        map(
          (currencies) => {
            /**
             * Elimination des éventuels doublants par code de currency
             */
            return currencies.filter(
              (obj, pos, arr) => arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos);
          }),
        // catchError(this.handleError<Currency>('getListCurrencies'))
      );
  }

  /**
       * n'interrompe pas l'exécution de l'application si la requête HTTP retourne une erreur
       * @param operation - nom de l'opération
       * @param result - valeur optionnelle à retourner comme observable
       */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      /*on peut simplement retourner un resultat vide si on n'a pas de traitement specifique. */
      return of(result as T);
    };
  }
}
