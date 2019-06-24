import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AttributePickerComponent } from './attribute-picker/attribute-picker.component';
import { StorylineGeneratorComponent } from './storyline-generator/storyline-generator.component';
import { StorySummaryComponent } from './story-summary/story-summary.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'attribute-picker', component: AttributePickerComponent },
  { path: 'storyline-generator', component: StorylineGeneratorComponent },
  { path: 'story-summary', component: StorySummaryComponent }
  // when /attribute-picker URL is visited, router will generate attribute picker
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // forRoot() creates a module that contains all directives, given routes, and router service
  exports: [RouterModule]
})
export class AppRoutingModule { }
