import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarModule, MatDialog, MatTableDataSource } from '@angular/material';
import { MatSort} from '@angular/material/sort';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  title = 'material-demo';
  selectedValue: string;
  options : string[] = ['Angular', 'React', 'Vue'];
  objectOptions = [
    { name: 'Angular'}, 
    { name: 'Angular Material'}, 
    { name: 'React'}, 
    { name: 'Vue'}
  ];

  minDate = new Date(); // today
  maxDate = new Date(2021, 3, 17);

  dateFilter = date => {
    const dat = date.getDay();
    return dat != 0 && dat != 6;
  }

  myControl = new FormControl();
  filterOptions: Observable<string[]>;


  notifications = 0;  
  showSpinner = false;
  opened = false;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']; // this defines the order in the data
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.filterOptions = this.myControl.valueChanges.pipe( // when the input value changes, _filter() is called
      startWith(''),
      map(value => this._filter(value))
    );

    this.dataSource.sort = this.sort;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue))
  }

  loadData () {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner= false;
    } ,5000);
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  logs(state) {
    console.log(state);
  }

  logChange(index) {
    console.log(index);
  }

  displayFunction(subject) {
    return subject ? subject.name : undefined;
  }

  openSnackbar(message, action) {
    let snackBarRef = this.snackBar.open(message, action, {duration: 2000});

    snackBarRef.afterDismissed().subscribe( () => {
      console.log('The snackbar was dismissed')
    });

    snackBarRef.onAction().subscribe( () => {
      console.log('The snackbar was triggered')
    });
  }

  openCustomSnackbar() {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {duration: 2000})
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogExampleComponent, {data: {name: `Jessie`}})

    dialogRef.afterClosed().subscribe( result => {
      console.log(`Dialog results: ${result}`);
    });
  }

  logData (row) {
    console.log(row);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

@Component({
  selector: 'custom-snackabr',
  template: `<span style='color: orange'>Custom Snackbar</span>`
})
export class CustomSnackBarComponent {}
