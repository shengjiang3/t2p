import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSliderChange, MatSlider } from '@angular/material';
import { POD } from '../pod.model';
import { POG } from '../pog.model';

@Component({
  selector: 'app-attribute-picker',
  templateUrl: './attribute-picker.component.html',
  styleUrls: ['./attribute-picker.component.css'],
})

export class AttributePickerComponent implements OnInit {
  // POD: POD;
  // POG: POG;

  POG = {
    honesty: 0,
    desirability: 0,
  };

  POD = {
    honesty: 0,
    desirability: 0,
  };

  constructor(private router: Router) {
    // this.POD = new POD(0, 0);
    // this.POG = new POG(0, 0);
  }

  ngOnInit() {}

  public onPOGHonestySliderChange(event: MatSliderChange) {
    // this.POG.setHonesty(event.value);
    this.POG.honesty = event.value;
  }

  public onPOGDesirabilitySliderChange(event: MatSliderChange) {
    // this.POG.setDesirability(event.value);
    this.POG.desirability = event.value;
  }

  public onPODHonestySliderChange(event: MatSliderChange) {
    // this.POD.setHonesty(event.value);
    this.POD.honesty = event.value;
  }

  public onPODDesirabilitySliderChange(event: MatSliderChange) {
    // this.POD.setDesirability(event.value);
    this.POD.desirability = event.value;
  }

  public navigate(event: Event) {
    event.preventDefault();
    this.router.navigate(['storyline-generator'], { state: {
      POGHonesty: this.POG.honesty,
      POGDesirability: this.POG.desirability,
      PODHonesty: this.POD.honesty,
      PODDesirability: this.POD.desirability } });
  }
}
