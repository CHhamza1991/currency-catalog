/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from '@angular/core';

/* Dépendences RxJS */
import { Subject } from 'rxjs';

/* Models */
import { Filters } from '../filters.model';

@Injectable({
  /**
   * On en a besoin en tant que singleton dans toute l'application
   */
  providedIn: 'root'
})
export class FiltersService {

  private filters = new Filters(null, null);
  public filterSubject = new Subject<Filters>();
  public criterias = [
    {
      value: 'code',
      viewValue: 'Code'
    },
    {
      value: 'name',
      viewValue: 'Name'
    },
    {
      value: 'id',
      viewValue: 'ID'
    },
    {
      value: 'currency_type',
      viewValue: 'Type'
    }
  ];

  constructor() { }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * @param filtres les filtres appliqués par l'utilisateur
   * Sauvegarde les filtres et déclenche la mise à jour de la liste des currencies
   */
  public saveAll(filters: Filters) {
    this.filters = filters;
    this.filterSubject.next(this.filters);
  }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * @returns filtres appliqués actuellement
   */
  public getFilters() {
    return this.filters;
  }
}
