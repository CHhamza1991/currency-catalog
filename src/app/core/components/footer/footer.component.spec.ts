/* Dépendences fonctionnelles internes d'Angular */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

/* Components */
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render copyright text', () => {
    const year = new Date().getFullYear();
    const de = fixture.debugElement;
    const section = de.nativeElement.querySelector('.footer__block');
    expect(section.textContent).toContain(year);
    expect(section.textContent).toContain('Société Générale.Tous droits réservés.');

  });
});
