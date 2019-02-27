/* Dépendences fonctionnelles internes d'Angular */
import { Injector, Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpErrorResponse,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

/* Dépendences RxJS */
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

/* Services */
import { ModalService } from '../../shared/services/modal.service';
import { WindowRef } from '../../shared/services/window-ref';



@Injectable()
export class UnavailableHttpInterceptor implements HttpInterceptor {

    private dialog;

    constructor(private injector: Injector,
        private modalService: ModalService,
        private windowRef: WindowRef) {
        setTimeout(() => {
            this.dialog = this.injector.get(MatDialog);
        });
    }

    /**
     * @version 1.0.0
     * @author Hamza Chaabani
     *Intercepteur HTTP qui affiche une popup d'erreur indiquant une indisponibilité de service,
     * si le serveur renvoi un code http-error pour n'importe quelle requête non aboutie.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(request).pipe(catchError((error, caught) => {
            if (error instanceof HttpErrorResponse) {
                this.manageHttpErrorResponse(error);
            }
            return next.handle(request);
        }));
    }

    /**
     * @version 1.0.0
     * @author Hamza Chaabani
     * @param error Erreur de la réponse http
     * Gérer la réponse HTTP en cas d'erreur
     */
    private manageHttpErrorResponse(error: HttpErrorResponse): void {
        switch (error.status) {

            /* code erreur renvoyé par le serveur */
            case 404:
            case 500:
            case 504:
            case 503:
            console.log('intercepted');
                this.modalService.openModalServiceUnavailable();
                this.modalService.dialogRef.beforeClose().subscribe(result => {
                    if (result === 'service-unavailable') {
                        this.windowRef.nativeWindow.history.back();
                    }
                });
                break;
        }
    }

}
