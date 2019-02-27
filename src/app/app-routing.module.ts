/* Dépendences fonctionnelles internes d'Angular */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Services */
import { CurrencyDetailsResolverService } from './currencies/currency-details/services/currency-details-resolver.service';
import { CurrencyDetailsService } from './currencies/currency-details/services/currency-details.service';

/* Components */
import { ListeCurrenciesComponent } from './currencies/liste-currencies/liste-currencies.component';
import { CurrencyDetailsComponent } from './currencies/currency-details/currency-details.component';

const routes: Routes = [
  {
    path: '',
    component: ListeCurrenciesComponent,
    pathMatch: 'full'
  },
  {
    path: 'currency/:id',
    component: CurrencyDetailsComponent,
    resolve: {
      currency: CurrencyDetailsResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [
    CurrencyDetailsService,
    CurrencyDetailsResolverService
  ],
})
export class AppRoutingModule { }
