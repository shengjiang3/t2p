import { Component, Input, OnInit } from "@angular/core";
import { POD } from '../pod.model';
import { POG } from '../pog.model';
import { Plot } from '../models/plot-event.model';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-storyline-generator',
  templateUrl: './storyline-generator.component.html',
  styleUrls: ['./storyline-generator.component.css']
})

export class StorylineGeneratorComponent implements OnInit {
  // POD: POD;
  // POG: POG;

  // plotEvents: Plot[] = [];

  // plotEvents.push(
  //   { name: 'In a relationship',
  //   partner: 'POG',
  //   act: 'Opening',
  //   fill: false });


  POG = {
    honesty: 0,
    desirability: 0,
  };

  POD = {
    honesty: 0,
    desirability: 0,
  };

  constructor() {
    // this.POD = new POD(0, 0);
    // this.POG = new POG(0, 0);
  }

  ngOnInit() {
    this.POG.honesty = window.history.state.POGHonesty;
    this.POG.desirability = window.history.state.POGDesirability;
    this.POD.honesty = window.history.state.PODHonesty;
    this.POD.desirability = window.history.state.PODDesirability;
  }
}
