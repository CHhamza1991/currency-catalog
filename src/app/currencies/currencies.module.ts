/* Dépendences fonctionnelles internes d'Angular */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* modules imbriqués dans l'application */
import { SharedModule } from '../shared/shared.module';

/* Components */
import { ListeCurrenciesComponent } from './liste-currencies/liste-currencies.component';
import { CurrencyComponent } from './liste-currencies/currency/currency.component';
import { FiltersComponent } from './liste-currencies/filters/filters.component';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';

@NgModule({
    declarations: [
        ListeCurrenciesComponent,
        CurrencyComponent,
        FiltersComponent,
        CurrencyDetailsComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class CurrenciesModule { }
