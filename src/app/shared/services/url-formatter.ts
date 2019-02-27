/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from '@angular/core';


@Injectable()
export class UrlFormatter {

    /**
     * @version 1.0.0
     * @author Hamza Chaabani
     * @param url string
     * @param values string[]
     * Permet de formater une URL en remplaçant les token {} par les valeurs fournies en paramètres.
     * Chaque token est remplacer par une des valeurs dans l'order d'apparition dans l'URL.
     *
     * ex :
     *  const result = urlFormatter.format('/x/y/{}/z/{}', 18, 44);
     *  => result : /x/y/18/z/44
     */
    format(url: string, ...values: string[]): string {
        let formattedUrl = url;
        for (const value of values) {
            formattedUrl = formattedUrl.replace('{}', value);
        }
        return formattedUrl;
    }
}
