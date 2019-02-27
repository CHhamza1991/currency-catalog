/* Dépendences fonctionnelles internes d'Angular */
import {
  Component,
  Input
} from '@angular/core';

/* Models */
import { Currency } from '../currency.model';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  @Input() currency: Currency;

  constructor() { }

}
