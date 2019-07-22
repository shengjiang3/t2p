export class Plot {
  name: string;
  partner: string[];
  act: string;
  preselection?: string;
  desirabilityValues: number[];
  honestyValues: number[];
  value: number;

  constructor(name: string, partner: string[], act: string, preselection: string, desirabilityValues: number[], honestyValues: number[], value: number) {
    this.name = name;
    this.partner = partner;
    this.act = act;
    this.preselection = preselection;
    this.desirabilityValues = desirabilityValues;
    this.honestyValues = honestyValues;
    this.value = value;
  }
}
