/* Dépendences fonctionnelles internes d'Angular */
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material';

/* Modules imbriqués dans l'application */
import { SharedModule } from '../shared.module';

/* Services */
import { ModalService } from './modal.service';

describe('ModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModalService,
        MatDialog
      ],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        MatDialogModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });
  });

  it('should be created', () => {
    const service: ModalService = TestBed.get(ModalService);
    expect(service).toBeTruthy();
  });

  it('should open service-unavailable modal ', () => {
    const service: ModalService = TestBed.get(ModalService);

    service.openModalServiceUnavailable();

    expect(service.dialogRef.componentInstance.passedData.instance).toEqual('service-unavailable');
  });

});
