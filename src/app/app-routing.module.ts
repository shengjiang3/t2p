import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AttributePickerComponent } from './attribute-picker/attribute-picker.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'attribute-picker', component: AttributePickerComponent }
  // when /attribute-picker URL is visited, router will generate attribute picker
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // forRoot() creates a module that contains all directives, given routes, and router service
  exports: [RouterModule]
})
export class AppRoutingModule { }
