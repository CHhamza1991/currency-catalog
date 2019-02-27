/* Dépendences fonctionnelles internes d'Angular */
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

/* Services */
import { FiltersService } from './services/filters.service';

/* Models */
import { Filters } from './filters.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  filtersFormGroup: FormGroup;
  criterias: any;
  private _filters: Filters;

  constructor(private filtersService: FiltersService, private fb: FormBuilder) { }

  ngOnInit() {

    /**
     * charger la liste des critère supportés
     */
    this.criterias = this.filtersService.criterias;

    /**
     * charger le dernier filtre utilisé
     */
    this._filters = this.filtersService.getFilters();

    /**
     * Créer le formulaire des filtres
     */
    this.filtersFormGroup = this._buildForm();
    /**
     * Conditionner l'activation du champ de saisie par la sélection d'un critère
     */
    this.filtersFormGroup.get('filterCriteria')
      .valueChanges
      .subscribe(
        (criteria) => {
          if (criteria) {
            this.filtersFormGroup.get('filterValue').enable();
          } else {
            this.filtersFormGroup.get('filterValue').disable();
          }
        }
      );

  }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * Construire le formulaire
   */
  private _buildForm(): FormGroup {
    return this.fb.group({
      filterValue: new FormControl(
        {
          value: this._filters ? this._filters.filterValue : '',
          disabled: this._filters ? false : true
        }
      ),
      filterCriteria: new FormControl(
        {
          value: this._filters ? this._filters.filterCriteria : '',
          disabled: false
        },
        {
          validators: [
            Validators.required
          ],
          updateOn: 'change'
        }
      )
    });
  }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * Récupèrer les valeurs des filtres depuis le formulaire et les sauvegarder au niveau du service
   */
  filterCurrencies(): void {
    const value = <Filters>this.filtersFormGroup.getRawValue();
    this._filters = new Filters(value.filterValue, value.filterCriteria);
    this.filtersService.saveAll(this._filters);
  }

  /**
   * @version 1.0.0
   * @author Hamza Chaabani
   * Réinitialiser les champs du formulaire et mettre à jour les filtres au niveau du service
   */
  reset(): void {
    this.filtersFormGroup.reset();
    this._filters = new Filters(null, null);
    this.filtersService.saveAll(this._filters);
  }

}
