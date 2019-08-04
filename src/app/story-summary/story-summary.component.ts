import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-story-summary',
  templateUrl: './story-summary.component.html',
  styleUrls: ['./story-summary.component.css']
})

export class StorySummaryComponent {
  constructor(private router: Router) { }

  openingPOG = '';
  disruptionPOG = '';
  conflictPOG = '';
  choicePOG = '';

  openingPOD = '';
  disruptionPOD = '';
  conflictPOD = '';
  choicePOD = '';

  consequence = '';

  ngOnInit() {
    this.openingPOG = window.history.state.openingPOG;
    this.disruptionPOG = window.history.state.disruptionPOG;
    this.conflictPOG = window.history.state.conflictPOG;
    this.choicePOG = window.history.state.choicePOG;

    this.openingPOD = window.history.state.openingPOD;
    this.disruptionPOD = window.history.state.disruptionPOD;
    this.conflictPOD = window.history.state.conflictPOD;
    this.choicePOD = window.history.state.choicePOD;

    this.consequence = window.history.state.consequence;
  }
}
