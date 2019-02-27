/* Dépendences fonctionnelles internes d'Angular */
import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

/* Modules imbriqués dans l'application */
import { MaterialModule } from './material.module';

/* Services */
import { UrlFormatter } from './services/url-formatter';
import { WindowRef } from './services/window-ref';
import { ModalService } from './services/modal.service';

/* Components */
import { CurrenciesModalComponent } from './components/currencies-modal/currencies-modal.component';

@NgModule({
  declarations: [
    CurrenciesModalComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [
    CurrenciesModalComponent
  ],
  exports: [
    /* Components */
    CurrenciesModalComponent,

    /* Modules */
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        UrlFormatter,
        WindowRef,
        ModalService
      ]
    };
  }
}
