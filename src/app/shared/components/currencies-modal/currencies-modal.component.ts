/* Dépendences fonctionnelles internes d'Angular */
import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { modalTypesConfig } from './modal-types.config';

@Component({
  selector: 'app-currencies-modal',
  templateUrl: './currencies-modal.component.html',
  styleUrls: ['./currencies-modal.component.scss']
})
export class CurrenciesModalComponent implements OnInit {

  selectedModalType: any;
  modalMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any,
    public dialogRef: MatDialogRef<CurrenciesModalComponent>) { }

  ngOnInit() {
    console.log(this.passedData);
    this.selectedModalType = modalTypesConfig[this.passedData.instance];
    this.modalMessage = this.selectedModalType.message;
  }

  quitter(): void {
    this.dialogRef.close(this.selectedModalType.callback);
  }

}
