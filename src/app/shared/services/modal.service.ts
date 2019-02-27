/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

/* Components */
import { CurrenciesModalComponent } from '../components/currencies-modal/currencies-modal.component';

@Injectable()
export class ModalService {

  dialogRef: MatDialogRef<CurrenciesModalComponent>;

  constructor(private dialog: MatDialog) { }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * Affiche la modal de service indisponible
   */
    openModalServiceUnavailable() {
      console.log('service modal');
    this.dialogRef = this.dialog.open(CurrenciesModalComponent, {
      height: '255px',
      panelClass: 'no-padding-dialog',
      disableClose: true,
      data: {
        instance: 'service-unavailable'
      }
    });
  }

}
