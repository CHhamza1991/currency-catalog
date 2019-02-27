/* Dépendences fonctionnelles internes d'Angular */
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

/* Dépendances RxJS */
import { Subscription } from 'rxjs';

/* Services */
import { ListeCurrenciesService } from './services/liste-currencies.service';
import { FiltersService } from './filters/services/filters.service';

/* Models */
import { Currency } from './currency.model';
import { Filters } from './filters/filters.model';

@Component({
  selector: 'app-liste-currencies',
  templateUrl: './liste-currencies.component.html',
  styleUrls: ['./liste-currencies.component.scss'],
  providers: [
    ListeCurrenciesService
  ]
})
export class ListeCurrenciesComponent implements OnInit, OnDestroy {

  filtersParams = new Map<string, any>();
  listcurrencies: Currency[];
  chargement = true;
  noResult = false;
  private listCurrenciesSubscription: Subscription;

  constructor(private router: Router,
    private listeCurrenciesService: ListeCurrenciesService,
    private filtersService: FiltersService) { }

  ngOnInit() {
    this.initialiseFilters();
    this.getListCurrencies();

    /**
     * @version 1.0.0
     * @author Hamza Chaabani
     * Mettre à jour la liste des currencies à chaque nouvelle valeur des filtres
     */
    this.filtersService.filterSubject.subscribe(
      (filters: Filters) => {
        this._setFiltersParams(filters);
        this.getListCurrencies();
      }
    );
  }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * @param filtres filtres à appliqué pour la recherche des currencies
  * Définit une map de paramètres des filtres dont clé et valeur bien définis, sinon map vide
   */
  private _setFiltersParams(filters: Filters): void {
    if (!isNullOrUndefined(filters) && !isNullOrUndefined(filters.filterCriteria)
      && !isNullOrUndefined(filters.filterValue) && filters.filterValue !== '') {
      this.filtersParams.set(filters.filterCriteria, filters.filterValue);
    } else {
      this.filtersParams.clear();
    }
  }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * Initialiser les filtres de recherche
   */
  public initialiseFilters() {
    const registredFilters = this.filtersService.getFilters();
    this._setFiltersParams(registredFilters);
  }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * Charger la liste des currencies du serveur
   */
  public getListCurrencies() {
    this.listCurrenciesSubscription = this.listeCurrenciesService.getListCurrencies(this.filtersParams)
      .subscribe(
        (listcurrencies: Currency[]) => {
          this.listcurrencies = listcurrencies;
          if (isNullOrUndefined(this.listcurrencies) || this.listcurrencies.length === 0) {
            this.noResult = true;
          } else {
            this.noResult = false;
          }
          this.chargement = false;
        }
      );
  }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * @param currency le currency sélectionner
   * Navigation à la page des détails du currency sélectionner
   */
  loadDetails(currency: Currency): void {
    this.router.navigate(['/currency', currency.id]);
  }

  ngOnDestroy() {
    /**
     * Nettoyer et désinscrire de l'observable pour éviter les éventuels problèmes de mémoire
     */
    if (this.listCurrenciesSubscription) {
      this.listCurrenciesSubscription.unsubscribe();
    }
  }

}
