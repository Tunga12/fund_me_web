import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

const ROUTES: Routes = [
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class NotFoundModule {}
