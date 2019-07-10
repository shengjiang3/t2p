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

  constructor() {
    // this.POD = new POD(0, 0);
    // this.POG = new POG(0, 0);
  }

  private plotEvents: Plot[] = [];
  private cards: Plot[] = [];

  // plotEvents.push(new Plot('In a relationship', 'POG', 'Opening', null, null, false));

  POG = {
    honesty: 0,
    desirability: 0,
  };

  POD = {
    honesty: 0,
    desirability: 0,
  };

  ngOnInit() {
    this.POG.honesty = window.history.state.POGHonesty;
    this.POG.desirability = window.history.state.POGDesirability;
    this.POD.honesty = window.history.state.PODHonesty;
    this.POD.desirability = window.history.state.PODDesirability;

    this.plotEvents.push(new Plot('In a relationship', ['POG'], 'Opening', null, null, null, false));
    this.plotEvents.push(new Plot('Dating', ['POD'], 'Opening', null, null, null, false));
    this.plotEvents.push(new Plot('Encounter', ['POD'], 'Opening', null, null, null, false));
    this.plotEvents.push(new Plot('Love at first sight', ['POD'], 'Opening', null, [1,2], null, false));
    this.plotEvents.push(new Plot('Disagreement in relationship', ['POD','POG'], 'Disruption', null, null, null, false));
    this.plotEvents.push(new Plot('Seduction', ['POD'], 'Disruption', null, [1,2], null, false));
    this.plotEvents.push(new Plot('GWEN suffers from violence', ['POG'], 'Disruption', null, [-2,-1], null, false));
    this.plotEvents.push(new Plot('G.O. is jealous', ['POG'], 'Disruption', null, [-2,-1], null, false));
    this.plotEvents.push(new Plot('Get emotional support', ['POD'], 'Disruption', 'GWEN suffers from violence', null, null, false));
    this.plotEvents.push(new Plot('Suspicious of disloyalty', ['POG'], 'Disruption', null, [-2,-1], null, false));
    this.plotEvents.push(new Plot('Moral conflict', ['POD'], 'Crisis', null, null, null, false));
    this.plotEvents.push(new Plot('Threatens you', ['POG'], 'Crisis', null, [-2,-1], null, false));
    this.plotEvents.push(new Plot('Caught cheating on you', ['POG'], 'Crisis', null, null, [-2,-1], false));
    this.plotEvents.push(new Plot('Caught stealing from you', ['POG'], 'Crisis', null, null, [-2,-1], false));
    this.plotEvents.push(new Plot('Stay together', ['POG', 'POD'], 'Choice', null, null, null, false));
    this.plotEvents.push(new Plot('Break up', ['POG', 'POD'], 'Choice', null, null, null, false));
    this.plotEvents.push(new Plot('Seek help', ['POG', 'POD'], 'Choice', null, null, null, false));
    this.plotEvents.push(new Plot('Stand up for yourself', ['POG', 'POD'], 'Choice', null, null, null, false));

    // populate initial options

  }
}
