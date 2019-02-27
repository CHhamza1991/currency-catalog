export class Filters {
    private _filterValue: string;
    private _filterCriteria: string;

    constructor(filterValue: string, filterCriteria: string) {
        this._filterValue = filterValue;
        this._filterCriteria = filterCriteria;
    }

    get filterValue(): string {
        return this._filterValue;
    }

    set filterValue(value: string) {
        this._filterValue = value;
    }

    get filterCriteria(): string {
        return this._filterCriteria;
    }

    set filterCriteria(value: string) {
        this._filterCriteria = value;
    }
}
