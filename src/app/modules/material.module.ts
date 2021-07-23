import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';

const imports = [
  MatSidenavModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatRadioModule,
  MatProgressBarModule,
  MatButtonModule,
  MatSliderModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatDividerModule,
  MatCardModule,
  MatGridListModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatIconModule,
  MatStepperModule,
  MatSelectModule,
  MatDialogModule,
  MatTabsModule,
  MatDialogModule,
  MatCheckboxModule,
];
const exports = imports;
@NgModule({
  imports: imports,
  exports: exports,
})
export class MyMaterialModule {
  
}
