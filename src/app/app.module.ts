import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatDividerModule, MatSliderModule, MatGridListModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AttributePickerComponent } from './attribute-picker/attribute-picker.component';
import { StorylineGeneratorComponent } from './storyline-generator/storyline-generator.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AttributePickerComponent,
    StorylineGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatSliderModule,
    FormsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
