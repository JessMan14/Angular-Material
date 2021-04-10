import { NgModule } from '@angular/core';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatProgressSpinnerModule, MatToolbarModule,
  MatSidenavModule, MatMenuModule
} from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule } from '@angular/forms';

const material = [
  MatButtonModule, 
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  FormsModule
];

@NgModule({
  declarations: [],
  imports: [
    material
  ],
  exports: [
    material
  ]
})
export class MaterialModule { }
