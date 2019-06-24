import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-attribute-picker',
  templateUrl: './attribute-picker.component.html',
  styleUrls: ['./attribute-picker.component.css'],
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

  attributeValues = [
    this.POG.honesty,
    this.POG.desirability,
    this.POD.honesty,
    this.POD.desirability
  ];

  // honestyPOD = 0;
  // desirabilityPOG = 0;
  // desirabilityPOD = 0;
  // @Output() submitClicked = new EventEmitter();

  // onSubmit() {
  //   const sliderValues = {
  //     honestyPOG: this.honestyPOG,
  //     honestyPOD: this.honestyPOD,
  //     desirabilityPOG: this.desirabilityPOG,
  //     desirabilityPOD: this.desirabilityPOD
  //   };
  //   this.submitClicked.emit(sliderValues);
  // }
}
