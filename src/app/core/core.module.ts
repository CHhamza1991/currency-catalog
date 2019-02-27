/* Dépendences fonctionnelles internes d'Angular */
import {
    NgModule,
    ModuleWithProviders,
    Injector
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/* modules imbriqués dans l'application */
import { SharedModule } from '../shared/shared.module';

/* Services */
import { UnavailableHttpInterceptor } from './services/unavailable-http-interceptor';

/* Components */
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
    declarations: [
        /* Components */
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        /* Modules et librairies externes */
        CommonModule,

        /* Components */
        HeaderComponent,
        FooterComponent
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: UnavailableHttpInterceptor,
                    multi: true
                }
            ]
        };
    }
}
