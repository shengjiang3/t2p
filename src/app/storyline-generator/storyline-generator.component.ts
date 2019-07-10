import { Component, Input, OnInit } from "@angular/core";
import { POD } from '../models/pod.model';
import { POG } from '../models/pog.model';
import { Plot } from '../models/plot-event.model';
// import { Router } from '@angular/router';

// todo: calculate score of POD and POG at Consequence act

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

  // plot event arrays for each act for the POG
  private openingEventsPOG: Plot[] = [];
  private disruptionEventsPOG: Plot[] = [];
  private crisisEventsPOG: Plot[] = [];
  private choiceEventsPOG: Plot[] = [];

  // plot event arrays for each act for the POD
  private openingEventsPOD: Plot[] = [];
  private disruptionEventsPOD: Plot[] = [];
  private crisisEventsPOD: Plot[] = [];
  private choiceEventsPOD: Plot[] = [];

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

    this.plotEvents.push(new Plot('In a relationship', ['POG'], 'Opening', null, null, null));
    this.plotEvents.push(new Plot('Dating', ['POG', 'POD'], 'Opening', null, null, null));
    this.plotEvents.push(new Plot('Encounter', ['POD'], 'Opening', null, null, null));
    this.plotEvents.push(new Plot('Love at first sight', ['POD'], 'Opening', null, [1, 2], null));

    this.plotEvents.push(new Plot('Disagreement in relationship', ['POG', 'POD'], 'Disruption', null, null, null));
    this.plotEvents.push(new Plot('Seduction', ['POD'], 'Disruption', null, [1, 2], null));
    this.plotEvents.push(new Plot('GWEN suffers from violence', ['POG'], 'Disruption', null, [-2, -1], null));
    this.plotEvents.push(new Plot('G.O. is jealous', ['POG'], 'Disruption', null, null, null));
    this.plotEvents.push(new Plot('Get emotional support', ['POD'], 'Disruption', 'GWEN suffers from violence', null, null));
    this.plotEvents.push(new Plot('Suspicious of disloyalty', ['POG'], 'Disruption', null, null, [-2, -1]));

    this.plotEvents.push(new Plot('Moral conflict', ['POG', 'POD'], 'Crisis', null, null, null));
    this.plotEvents.push(new Plot('Threatens you', ['POG'], 'Crisis', null, [-2, -1], null));
    this.plotEvents.push(new Plot('Caught cheating on you', ['POG'], 'Crisis', null, null, [-2, -1]));
    this.plotEvents.push(new Plot('Caught stealing from you', ['POG'], 'Crisis', null, null, [-2, -1]));

    this.plotEvents.push(new Plot('Stay together', ['POG', 'POD'], 'Choice', null, null, null));
    this.plotEvents.push(new Plot('Break up', ['POG', 'POD'], 'Choice', null, null, null));
    this.plotEvents.push(new Plot('Seek help', ['POG', 'POD'], 'Choice', null, null, null));
    this.plotEvents.push(new Plot('Stand up for yourself', ['POG', 'POD'], 'Choice', null, null, null));


    // populate initial options
    // iterate after each act to check for pre-selections
    // this.plotEvents.forEach(plot => {
    //   if (plot.act === 'Opening') { // populate opening act options for POG & POD
    //     if (plot.partner[0] === 'POG') {
    //       this.openingEventsPOG.push(plot);
    //     }
    //     if (plot.partner[0] === 'POD' || plot.partner[1] === 'POD') {
    //       this.openingEventsPOD.push(plot);
    //     }
    //   }
    //   if (plot.act === 'Disruption') { // populate disruption act
    //     if (plot.partner[0] === 'POG') {
    //       if (plot.desirabilityValues == null) {
    //         this.disruptionEventsPOG.push(plot);
    //       }
    //       if (this.POG.desirability < 0 && plot.desirabilityValues[0] === -1) {
    //         this.disruptionEventsPOG.push(plot);
    //       }
    //       if (this.POG.honesty < 0 && plot.honestyValues[0] === -1) {
    //         this.disruptionEventsPOG.push(plot);
    //       }
    //       if (this.POD.desirability > 0 && plot.preselection === 'G.O. is jealous') {
    //         this.disruptionEventsPOG.push(plot);
    //       }
    //     }
    //     if (plot.partner[0] === 'POD' || plot.partner[1] === 'POD') {
    //       if (plot.desirabilityValues == null) {
    //         this.disruptionEventsPOD.push(plot);
    //       }
    //       if (this.POD.desirability > 0 && plot.desirabilityValues[0] === 1) {
    //         this.disruptionEventsPOD.push(plot);
    //       }
    //       if (plot.preselection === 'GWEN suffers from violence') {
    //         this.disruptionEventsPOG.push(plot);
    //       }
    //     }
    //   }
    //   if (plot.act === 'Crisis') {
    //     if (plot.partner[0] === 'POG') {
    //       if (plot.desirabilityValues == null && plot.honestyValues == null) {
    //         this.crisisEventsPOG.push(plot);
    //       }
    //       if (this.POG.honesty < 0 && plot.honestyValues[0] === -1) {
    //         this.crisisEventsPOG.push(plot);
    //       }
    //       if (this.POG.desirability < 0 && plot.desirabilityValues[0] === -1) {
    //         this.crisisEventsPOG.push(plot);
    //       }
    //     }
    //     if (plot.partner[0] === 'POD' || plot.partner[1] === 'POD') {
    //       if (plot.desirabilityValues == null && plot.honestyValues == null) {
    //         this.crisisEventsPOG.push(plot);
    //       }
    //     }
    //   }
    //   if (plot.act === 'Choice') {
    //     this.choiceEventsPOG.push(plot);
    //     this.choiceEventsPOD.push(plot); // remove POG choice for POD later
    //   }
    // });

    console.log('Disruption events POD length: ' + this.disruptionEventsPOD.length);
    // console.log('Crisis events POD length: ' + this.crisisEventsPOD.length);
  }
}
