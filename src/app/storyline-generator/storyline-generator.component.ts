import { Component, Input, OnInit } from '@angular/core';
import { POD } from '../models/pod.model';
import { POG } from '../models/pog.model';
import { Plot } from '../models/plot-event.model';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

// todo: calculate score of POD and POG at Consequence act

// declare function initialize(): any;

@Component({
  selector: 'app-storyline-generator',
  templateUrl: './storyline-generator.component.html',
  styleUrls: ['./storyline-generator.component.css']
})

export class StorylineGeneratorComponent implements OnInit {
  POD: POD;
  POG: POG;

  step = 'OpeningPOG'; // initial switch statement case
  selection = ''; // user selected plot event

  showDisruptionPOG = false; // card hidden by default
  showConflictPOG = false;
  showChoicePOG = false;

  showOpeningPOD = false; // card hidden by default
  showDisruptionPOD = false;
  showConflictPOD = false;
  showChoicePOD = false;

  filledPOG = false;
  filledPOD = false;

  textOpeningPOG = false;
  textOpeningPOD = false;
  textDisruptionPOG = false;
  textDisruptionPOD = false;
  textConflictPOG = false;
  textConflictPOD = false;
  textChoicePOG = false;
  textChoicePOD = false;

  selectionOpeningPOG = '';
  selectionOpeningPOD = '';
  selectionDisruptionPOG = '';
  selectionDisruptionPOD = '';
  selectionConflictPOG = '';
  selectionConflictPOD = '';
  selectionChoicePOG = '';
  selectionChoicePOD = '';

  private plotEvents: Plot[] = []; // holds all possible plot events
  cards: Plot[] = []; // options that show up
  selectedEventsPOG: string[] = []; // selected options for POG
  selectedEventsPOD: string[] = []; // selected options for POD

  // plot event arrays for each act/POG
  private openingEventsPOG: Plot[] = [];
  private disruptionEventsPOG: Plot[] = [];
  private crisisEventsPOG: Plot[] = [];
  private choiceEventsPOG: Plot[] = [];

  // plot event arrays for each act/POD
  private openingEventsPOD: Plot[] = [];
  private disruptionEventsPOD: Plot[] = [];
  private crisisEventsPOD: Plot[] = [];
  private choiceEventsPOD: Plot[] = [];

  constructor() { }

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //      );
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }

  ngOnInit() { // generate possible plot options for each act on page load
    this.POG = new POG(window.history.state.honesty, window.history.state.desirability);
    this.POD = new POD(window.history.state.honesty, window.history.state.desirability);

    this.plotEvents.push(new Plot('In a relationship', ['POG'], 'Opening', null, null, null));
    this.plotEvents.push(new Plot('Dating', ['POG', 'POD'], 'Opening', null, null, null));
    this.plotEvents.push(new Plot('Encounter', ['POD'], 'Opening', null, null, null));
    this.plotEvents.push(new Plot('Love at first sight', ['POD'], 'Opening', null, [1, 2], null));

    this.plotEvents.push(new Plot('Disagreement in relationship', ['POG', 'POD'], 'Disruption', null, null, null));
    this.plotEvents.push(new Plot('Seduction', ['POD'], 'Disruption', null, [1, 2], null));
    this.plotEvents.push(new Plot('GWEN suffers from violence', ['POG'], 'Disruption', null, [-2, -1], null));
    this.plotEvents.push(new Plot('G.O. is jealous', ['POG'], 'Disruption', null, [1, 2], null));
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
    this.plotEvents.forEach(plot => {
      if (plot.act === 'Opening') {
        if (plot.partner.includes('POG')) {
          this.openingEventsPOG.push(plot);
        }
        if (plot.partner.includes('POD')) {
          if (plot.desirabilityValues == null && plot.honestyValues == null) {
            this.openingEventsPOD.push(plot);
          } else {
            if (this.POD.desirability > 0 && plot.desirabilityValues[0] === 1) {
              this.openingEventsPOD.push(plot);
            }
          }
        }
      }
      if (plot.act === 'Disruption') {
        if (plot.partner.includes('POG')) {
          if (plot.desirabilityValues == null && plot.honestyValues == null) {
            this.disruptionEventsPOG.push(plot);
          } else {
            if (this.POG.desirability < 0 && plot.desirabilityValues[0] === -2) {
              this.disruptionEventsPOG.push(plot);
            } else if (this.POG.honesty < 0 && plot.honestyValues[0] === -2) {
              this.disruptionEventsPOG.push(plot);
            } else if (this.POD.desirability > 0) {
              this.disruptionEventsPOG.push(plot);
            }
          }
        }
        if (plot.partner.includes('POD')) {
          if (plot.desirabilityValues == null && plot.honestyValues == null) {
            this.disruptionEventsPOD.push(plot);
          } else {
            if (this.POD.desirability > 0 && plot.desirabilityValues[0] === 1) {
              this.disruptionEventsPOD.push(plot);
            }
          }
          // if (plot.preselection === 'GWEN suffers from violence') { // how to check for previous act selection
          //   this.disruptionEventsPOG.push(plot);
          // }
        }
      }
      if (plot.act === 'Crisis') {
        if (plot.partner.includes('POG')) {
          if (plot.desirabilityValues == null && plot.honestyValues == null) {
            this.crisisEventsPOG.push(plot);
          } else {
            if (this.POG.honesty < 0 && plot.honestyValues[0] === -2) {
              this.crisisEventsPOG.push(plot);
            }
            if (this.POG.desirability < 0 && plot.desirabilityValues[0] === -2) {
              this.crisisEventsPOG.push(plot);
            }
          }
        }
        if (plot.partner.includes('POD')) {
          if (plot.desirabilityValues == null && plot.honestyValues == null) {
            this.crisisEventsPOD.push(plot);
          }
        }
      }
      if (plot.act === 'Choice') {
        this.choiceEventsPOG.push(plot);
        this.choiceEventsPOD.push(plot); // remove POG's choice for POD later
      }
    });

    this.cards = this.openingEventsPOG;
  }

  ngOnClick(card: any) {
    switch (this.step) {
      case 'OpeningPOG': {
        if (this.filledPOG === false) {
          this.textOpeningPOG = true;
          this.selectionOpeningPOG = this.selection;
          this.selectedEventsPOG.push(card.name);
          this.filledPOG = true;
          this.showOpeningPOD = true;
          this.cards = this.openingEventsPOD;
          this.step = 'OpeningPOD';
          console.log('POG: ' + `${this.selectedEventsPOG}`);
        }
        break;
      }
      case 'OpeningPOD': {
        if (this.filledPOG === true && this.filledPOD === false) {
          this.textOpeningPOD = true;
          this.selectionOpeningPOD = this.selection;
          this.selectedEventsPOD.push(card.name);
          this.filledPOD = true;
          this.filledPOG = false;
          this.showDisruptionPOG = true;
          this.cards = this.disruptionEventsPOG;
          this.step = 'DisruptionPOG';
          console.log('POD: ' + `${this.selectedEventsPOD}`);
        }
        break;
      }
      case 'DisruptionPOG': {
        if (this.filledPOG === false && this.filledPOD === true) {
          this.textDisruptionPOG = true;
          this.selectionDisruptionPOG = this.selection;
          this.selectedEventsPOG.push(card.name);
          this.filledPOG = true;
          this.filledPOD = false;
          this.showDisruptionPOD = true;
          this.cards = this.disruptionEventsPOD;
          this.step = 'DisruptionPOD';
          console.log('POG: ' + `${this.selectedEventsPOG}`);
        }
        break;
      }
      case 'DisruptionPOD': {
        if (this.filledPOG === true && this.filledPOD === false) {
          this.textDisruptionPOD = true;
          this.selectionDisruptionPOD = this.selection;
          this.selectedEventsPOD.push(card.name);
          this.filledPOD = true;
          this.filledPOG = false;
          this.showConflictPOG = true;
          this.cards = this.crisisEventsPOG;
          this.step = 'CrisisPOG';
          console.log('POD: ' + `${this.selectedEventsPOD}`);
        }
        break;
      }
      case 'CrisisPOG': {
        if (this.filledPOG === false && this.filledPOD === true) {
          this.textConflictPOG = true;
          this.selectionConflictPOG = this.selection;
          this.selectedEventsPOG.push(card.name);
          this.filledPOG = true;
          this.filledPOD = false;
          this.showConflictPOD = true;
          this.cards = this.crisisEventsPOD;
          this.step = 'CrisisPOD';
          console.log('POD: ' + `${this.selectedEventsPOG}`);
        }
        break;
      }
      case 'CrisisPOD': {
        if (this.filledPOG === true && this.filledPOD === false) {
          this.textConflictPOD = true;
          this.selectionConflictPOD = this.selection;
          this.selectedEventsPOD.push(card.name);
          this.filledPOD = true;
          this.filledPOG = false;
          this.showChoicePOG = true;
          this.cards = this.choiceEventsPOG;
          this.step = 'ChoicePOG';
          console.log('POD: ' + `${this.selectedEventsPOD}`);
        }
        break;
      }
      case 'ChoicePOG': {
        if (this.filledPOG === false && this.filledPOD === true) {
          this.textChoicePOG = true;
          this.selectionChoicePOG = this.selection;
          this.selectedEventsPOG.push(card.name);
          this.filledPOG = true;
          this.filledPOD = false;
          this.showChoicePOD = true;
          this.cards = this.choiceEventsPOD;
          this.step = 'ChoicePOD';
          console.log('POD: ' + `${this.selectedEventsPOG}`);
        }
        break;
      }
      case 'ChoicePOD': {
        if (this.filledPOG === true && this.filledPOD === false) {
          this.textChoicePOD = true;
          this.selectionChoicePOD = this.selection;
          this.selectedEventsPOD.push(card.name);
          this.filledPOD = true;
          this.filledPOG = false;
          this.cards = this.choiceEventsPOG;
          this.step = 'ChoicePOG';
          console.log('POD: ' + `${this.selectedEventsPOD}`);
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  setText(text: string) {
    this.selection = text;
  }

  // toggleShow(show: boolean) {
  //   show = !show;
  //   console.log('show status: ' + show);
  // }
}

// function deselect(card: any) {

// }
