import { Component } from '@angular/core';

@Component({
  selector: 'app-attribute-picker',
  templateUrl: './attribute-picker.component.html',
  styleUrls: ['./attribute-picker.component.css']
})

export class AttributePickerComponent {
  POG = {
    honesty: 0,
    desirability: 0
  };

  POD = {
    honesty: 0,
    desirability: 0
  };
}
