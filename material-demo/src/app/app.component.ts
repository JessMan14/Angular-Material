import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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

  myControl = new FormControl();
  filterOptions: Observable<string[]>;


  notifications = 0;  
  showSpinner = false;
  opened = false;

  ngOnInit() {
    this.filterOptions = this.myControl.valueChanges.pipe( // when the input value changes, _filter() is called
      startWith(''),
      map(value => this._filter(value))
    );
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
}

