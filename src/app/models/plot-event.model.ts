export class Plot {
  name: string;
  partner: string[];
  act: string;
  preselection?: string;
  desirabilityValues: number[];
  honestyValues: number[];

  constructor(name: string, partner: string[], act: string, preselection: string, desirabilityValues:   number[], honestyValues: number[]) {
    this.name = name;
    this.partner = partner;
    this.act = act;
    this.preselection = preselection;
    this.desirabilityValues = desirabilityValues;
    this.honestyValues = honestyValues;
  }
}
