/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from '@angular/core';

@Injectable()
export class WindowRef {
    get nativeWindow(): any {
        return this._window();
    }

    /**
     * @version 1.0.0
     * @author Hamza Chaabani
     * @returns window permettant ainsi de tester l'objet global "window" et utiliser un mock.
     */
    _window(): any {
        return window;
    }
}
