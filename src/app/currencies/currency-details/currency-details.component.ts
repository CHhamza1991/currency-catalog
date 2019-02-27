/* Dépendences fonctionnelles internes d'Angular */
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

/* Dépendances RxJS */
import { Subscription } from 'rxjs';

/* Models */
import { CurrencyDetails } from './currency-details.model';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit, OnDestroy {

  currencyDetailsSubscription: Subscription;
  currencyDetails: CurrencyDetails;
  chargement = true;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this._getCurrencyDetails();
  }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * récupère les détails du currency à partir du Resolver
   */
  public _getCurrencyDetails(): void {
    this.currencyDetailsSubscription = this.route.data.subscribe(
      (data: Data) => {
        this.currencyDetails = data['currency'];
        this.chargement = false;
      }
    );
  }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * Revenir à la page "liste currencies"
   */
  backToCurrencies(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    /**
     * Nettoyer et désinscrire de l'observable pour éviter les éventuels problèmes de mémoire
     */
    if (this.currencyDetailsSubscription) {
      this.currencyDetailsSubscription.unsubscribe();
    }
  }

}
