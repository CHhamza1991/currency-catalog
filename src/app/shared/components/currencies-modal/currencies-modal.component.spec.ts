/* Dépendences fonctionnelles internes d'Angular */
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';

/* Modules imbriqués dans l'application */
import { SharedModule } from '../../shared.module';

/* Components */
import { CurrenciesModalComponent } from './currencies-modal.component';
import { By } from '@angular/platform-browser';

describe('CurrenciesModalComponent', () => {
  let component: CurrenciesModalComponent;
  let fixture: ComponentFixture<CurrenciesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MatDialog,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
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
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate service-indisponible modal with approprite config', () => {
    const config = {
      'class': 'error',
      'message': 'The service is temporarily unavailable.<br>Please try later.',
      'action': 'Previous page',
      'callback': 'service-unavailable'
  };
    component.passedData = {
      instance: 'service-unavailable'
    };
    fixture.detectChanges();
    expect(component.selectedModalType).toEqual(config);
  });


  it('should have an icon in the header', () => {
    component.passedData = {
      instance: 'service-unavailable'
    };
    fixture.detectChanges();
    const de = fixture.debugElement;
    const icon = de.nativeElement.querySelector('.dialog__header__icon');
    expect(icon).not.toBeNull();
  });

  it('should render a message in the body', () => {
    component.passedData = {
      instance: 'service-unavailable'
    };
    fixture.detectChanges();
    const de = fixture.debugElement;
    const message = de.nativeElement.querySelector('.dialog__body__message');
    expect(message).not.toBeNull();
  });

  it('should have an action button', () => {
    component.passedData = {
      instance: 'service-unavailable'
    };
    fixture.detectChanges();
    const de = fixture.debugElement;
    const button = de.nativeElement.querySelector('.action__button');
    expect(button).not.toBeNull();
  });

  it('should trigger modal close on click on the action button', () => {
    component.passedData = {
      instance: 'service-unavailable'
    };
    fixture.detectChanges();
    const de = fixture.debugElement;
    const button = de.query(By.css('.action__button'));
    const spy = spyOn(component, 'quitter');

    button.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalled();
  });
});
