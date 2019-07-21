// POD: POD;
// POG: POG;

// step = 'OpeningPOG'; // initial switch statement case
// selection = ''; // user selectied plot event

// var plotEvents = []; // holds all possible plot events
// var cards = []; // options that show up for selection
//   // selectedEventsPOG: Plot[] = []; // selected options for POG
//   // selectedEventsPOD: Plot[] = []; // selected options for POD

//   // plot event arrays for each act for the POG
// var openingEventsPOG = [];
// var disruptionEventsPOG = [];
// var crisisEventsPOG = [];
// var choiceEventsPOG = [];

//   // // plot event arrays for each act for the POD
// var openingEventsPOD = [];
// var disruptionEventsPOD = [];
// var crisisEventsPOD = [];
// var choiceEventsPOD = [];

// function initialize() {
//   this.POG = new POG(window.history.state.honesty, window.history.state.desirability);
//   this.POD = new POD(window.history.state.honesty, window.history.state.desirability);

//   this.plotEvents.push(new Plot('In a relationship', ['POG'], 'Opening', null, null, null));
//   this.plotEvents.push(new Plot('Dating', ['POG', 'POD'], 'Opening', null, null, null));
//   this.plotEvents.push(new Plot('Encounter', ['POD'], 'Opening', null, null, null));
//   this.plotEvents.push(new Plot('Love at first sight', ['POD'], 'Opening', null, [1, 2], null));

//   this.plotEvents.forEach(plot => {
//     if (plot.act === 'Opening') {
//       if (plot.partner.includes('POG')) {
//         this.openingEventsPOG.push(plot);
//       }
//       if (plot.partner.includes('POD')) {
//         if (plot.desirabilityValues == null && plot.honestyValues == null) {
//           this.openingEventsPOD.push(plot);
//         } else {
//           // if (this.POD.desirability > 0 && plot.desirabilityValues[0] === 1) {
//           if (this.POD.desirability > 0 && plot.desirabilityValues[0] === 1) {
//             this.openingEventsPOD.push(plot);
//           }
//         }
//       }
//     }
//     if (plot.act === 'Disruption') {
//       if (plot.partner.includes('POG')) {
//         if (plot.desirabilityValues == null && plot.honestyValues == null) {
//           this.disruptionEventsPOG.push(plot);
//         } else {
//           if (this.POG.desirability < 0 && plot.desirabilityValues[0] === -1) {
//             this.disruptionEventsPOG.push(plot);
//           }
//           if (this.POG.honesty < 0 && plot.honestyValues[0] === -1) {
//             this.disruptionEventsPOG.push(plot);
//           }
//         }
//         // if (this.POD.desirability > 0 && plot.preselection === 'G.O. is jealous') {
//         //   this.disruptionEventsPOG.push(plot);
//         // }
//       }
//       if (plot.partner.includes('POD')) {
//         if (plot.desirabilityValues == null && plot.honestyValues == null) {
//           this.disruptionEventsPOD.push(plot);
//         } else {
//           if (this.POD.desirability > 0 && plot.desirabilityValues[0] === 1) {
//             this.disruptionEventsPOD.push(plot);
//           }
//         }
//         // if (plot.preselection === 'GWEN suffers from violence') { // how to check for previous act selection
//         //   this.disruptionEventsPOG.push(plot);
//         // }
//       }
//     }
//     if (plot.act === 'Crisis') {
//       if (plot.partner.includes('POG')) {
//         if (plot.desirabilityValues == null && plot.honestyValues == null) {
//           this.crisisEventsPOG.push(plot);
//         } else {
//           if (this.POG.honesty < 0 && plot.honestyValues[0] === -1) {
//             this.crisisEventsPOG.push(plot);
//           }
//           if (this.POG.desirability < 0 && plot.desirabilityValues[0] === -1) {
//             this.crisisEventsPOG.push(plot);
//           }
//         }
//       }
//       if (plot.partner.includes('POD')) {
//         if (plot.desirabilityValues == null && plot.honestyValues == null) {
//           this.crisisEventsPOD.push(plot);
//         }
//       }
//     }
//     if (plot.act === 'Choice') {
//       this.choiceEventsPOG.push(plot);
//       this.choiceEventsPOD.push(plot); // remove POG's choice for POD later
//     }
//   });

//   console.log('plot events opening: ' + this.openingEventsPOG);
//   this.cards = this.openingEventsPOG;
// }

// app.controller('PlotController', ['$scope', function($scope) {

// }])
