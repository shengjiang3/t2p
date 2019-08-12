import { Component, Input, OnInit } from '@angular/core';
import { POD } from '../models/pod.model';
import { POG } from '../models/pog.model';
import { Plot } from '../models/plot-event.model';
import { Router } from '@angular/router';
// import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  showConsequence = false;

  filledPOG = false;
  filledPOD = false;

  textOpeningPOG = false; // show text if a card has been selected
  textOpeningPOD = false;
  textDisruptionPOG = false;
  textDisruptionPOD = false;
  textConflictPOG = false;
  textConflictPOD = false;
  textChoicePOG = false;
  textChoicePOD = false;
  textConsequence = false;

  selectionOpeningPOG = ''; // selected card
  selectionOpeningPOD = '';
  selectionDisruptionPOG = '';
  selectionDisruptionPOD = '';
  selectionConflictPOG = '';
  selectionConflictPOD = '';
  selectionChoicePOG = '';
  selectionChoicePOD = '';
  consequence = '';

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

  private scorePOG = 0;
  private scorePOD = 0;

  constructor(private router: Router) { }

  ngOnInit() { // generate possible plot options for each act on page load
    this.POG = new POG(window.history.state.POGHonesty, window.history.state.POGDesirability);
    this.POD = new POD(window.history.state.PODHonesty, window.history.state.PODDesirability);

    this.plotEvents.push(new Plot('In a relationship', ['POG'], 'Opening', null, null, 0));
    this.plotEvents.push(new Plot('Dating', ['POG', 'POD'], 'Opening', null, null, 0));
    this.plotEvents.push(new Plot('Encounter', ['POD'], 'Opening', null, null, 0));
    this.plotEvents.push(new Plot('Love at first sight', ['POD'], 'Opening', [1, 2], null, 1));

    this.plotEvents.push(new Plot('Disagreement in relationship', ['POG', 'POD'], 'Disruption', null, null, -1));
    this.plotEvents.push(new Plot('Seduction', ['POD'], 'Disruption', [1, 2], null, 1));
    this.plotEvents.push(new Plot('GWEN suffers from violence', ['POG'], 'Disruption', [-2, -1], null, -1));
    this.plotEvents.push(new Plot('G.O. is jealous', ['POG'], 'Disruption', [1, 2], null, -1));
    this.plotEvents.push(new Plot('Suspicious of disloyalty', ['POG'], 'Disruption', null, [-2, -1], -1));

    this.plotEvents.push(new Plot('Moral conflict', ['POG', 'POD'], 'Crisis', null, null, 0));
    this.plotEvents.push(new Plot('Threatens you', ['POG'], 'Crisis', [-2, -1], null, -1));
    this.plotEvents.push(new Plot('Caught cheating on you', ['POG'], 'Crisis', null, [-2, -1], -1));
    this.plotEvents.push(new Plot('Caught stealing from you', ['POG'], 'Crisis', null, [-2, -1], -1));

    this.plotEvents.push(new Plot('Stay together', ['POG', 'POD'], 'Choice', null, null, 0));
    this.plotEvents.push(new Plot('Break up', ['POG', 'POD'], 'Choice', null, null, 0));
    this.plotEvents.push(new Plot('Seek help', ['POD'], 'Choice', null, null, 0));
    this.plotEvents.push(new Plot('Stand up for yourself', ['POG'], 'Choice', null, null, 0));

    this.plotEvents.forEach(plot => {
      if (plot.act === 'Opening') {
        if (plot.partner.includes('POG')) {
          if (plot.desirabilityValues == null && plot.honestyValues == null) {
            this.openingEventsPOG.push(plot);
          }
        }
        if (plot.partner.includes('POD')) {
          if (plot.desirabilityValues == null && plot.honestyValues == null) {
            this.openingEventsPOD.push(plot);
          } else {
            if (plot.desirabilityValues != null) {
              if (this.POD.desirability > 0 && plot.desirabilityValues[0] === 1) {
                this.openingEventsPOD.push(plot);
              }
            }
          }
        }
      } else if (plot.act === 'Disruption') {
        if (plot.partner.includes('POG')) {
          if (plot.desirabilityValues == null && plot.honestyValues == null) {
            this.disruptionEventsPOG.push(plot);
          } else {
            if (plot.desirabilityValues != null) {
              if (this.POG.desirability < 0 && (plot.desirabilityValues[0] === -2)) {
                this.disruptionEventsPOG.push(plot);
              } else if (this.POD.desirability > 0 && (plot.desirabilityValues[0] === 1)) {
                this.disruptionEventsPOG.push(plot);
              }
            }
            if (plot.honestyValues != null) {
              if (this.POG.honesty < 0 && plot.honestyValues[0] === -2) {
                this.disruptionEventsPOG.push(plot);
              }
            }
          }
        }
        if (plot.partner.includes('POD')) {
          if (plot.desirabilityValues == null && plot.honestyValues == null) {
            this.disruptionEventsPOD.push(plot);
          } else {
            if (plot.desirabilityValues != null) {
              if (this.POD.desirability > 0 && (plot.desirabilityValues[0] == 1)) {
                this.disruptionEventsPOD.push(plot);
              }
            }
          }
        }
      } else if (plot.act === 'Crisis') {
        if (plot.partner.includes('POG')) {
          if (plot.desirabilityValues == null && plot.honestyValues == null) {
            this.crisisEventsPOG.push(plot);
          } else {
            if (plot.honestyValues != null) {
              if (this.POG.honesty < 0 && plot.honestyValues[0] === -2) {
                this.crisisEventsPOG.push(plot);
              }
            }
            if (plot.desirabilityValues != null) {
              if (this.POG.desirability < 0 && plot.desirabilityValues[0] === -2) {
                this.crisisEventsPOG.push(plot);
              }
            }
          }
        }
        if (plot.partner.includes('POD')) {
          if (plot.desirabilityValues == null && plot.honestyValues == null) {
            this.crisisEventsPOD.push(plot);
          }
        }
      } else if (plot.act === 'Choice') {
        if (plot.partner.includes('POG')) {
          this.choiceEventsPOG.push(plot);
        }
        if (plot.partner.includes('POD')) {
          this.choiceEventsPOD.push(plot);
        }
      }

      this.cards = this.openingEventsPOG;
    });
  }

  ngOnClick(card: any) {
    switch (this.step) {
      case 'OpeningPOG': {
        if (this.filledPOG === false) {
          this.textOpeningPOG = true;
          this.selectionOpeningPOG = this.selection;
          this.selectedEventsPOG.push(card.name);
          this.scorePOG += card.value;
          this.filledPOG = true;
          this.showOpeningPOD = true; // flag to show next set of cards
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
          this.scorePOD += card.value;
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
          this.scorePOG += card.value;
          if (card.name === 'GWEN suffers from violence') { // check previous selection
            this.disruptionEventsPOD.push(new Plot('Get emotional support', ['POD'], 'Disruption', null, null, 1));
          }
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
          this.scorePOD += card.value;
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
          this.scorePOG += card.value;
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
          this.scorePOD += card.value;
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
          this.scorePOG += card.value;
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
          this.scorePOD += card.value;
          this.filledPOD = true;
          this.filledPOG = false;
          this.showConsequence = true;
          this.textConsequence = true;
          this.generateConsequence(this.scorePOG, this.scorePOD);
          this.cards = null;
          this.step = 'Consequence';
          console.log('POD: ' + `${this.selectedEventsPOD}`);
        }
        break;
      }
      case 'Consequence': {
        this.textConsequence = true;
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

  generateConsequence(score1: number, score2: number) {
    if (score1 >= score2 && (this.selectionChoicePOG === 'Stay together') && (this.selectionChoicePOD === 'Break up')) {
      this.consequence = 'Happy with POG';
    } else if (score1 <= score2 && this.selectionChoicePOG === 'Stay together' && ((this.selectionChoicePOD === 'Break up') || this.selectionChoicePOD === 'Seek help')) {
      this.consequence = 'Sad with POG';
    } else if (score2 >= score1 && this.selectionChoicePOD === 'Stay together' && ((this.selectionChoicePOG === 'Break up') || (this.selectionChoicePOG === 'Stand up for yourself'))) {
      this.consequence = 'Happy with POD';
    } else if (score2 <= score1 && this.selectionChoicePOD === 'Stay together' && (this.selectionChoicePOG === 'Break up')) {
      this.consequence = 'Sad with POD';
    } else if (this.selectionChoicePOD === 'Seek help' && ((this.selectionChoicePOG === 'Break up') || (this.selectionChoicePOG === 'Stand up for yourself'))) {
      this.consequence = 'Get help with POD';
    } else if (this.selectionChoicePOG === 'Stand up for yourself' && this.selectionChoicePOD === 'Break up') {
      this.consequence = 'Alone at last';
    }
  }

  public navigateSummary(event: Event) {
    event.preventDefault();
    this.router.navigate(['story-summary'], { state: {
      openingPOG: this.selectionOpeningPOG,
      disruptionPOG: this.selectionDisruptionPOG,
      conflictPOG: this.selectionConflictPOG,
      choicePOG: this.selectionChoicePOG,
      openingPOD: this.selectionOpeningPOD,
      disruptionPOD: this.selectionDisruptionPOD,
      conflictPOD: this.selectionConflictPOD,
      choicePOD: this.selectionChoicePOD,
      consequence: this.consequence } });
  }

  // toggleShow(show: boolean) {
  //   show = !show;
  //   console.log('show status: ' + show);
  // }
  // }

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
}
