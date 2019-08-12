export class Plot {
  name: string;
  partner: string[];
  act: string;
  desirabilityValues: number[];
  honestyValues: number[];
  value: number;

  constructor(name: string, partner: string[], act: string, desirabilityValues: number[], honestyValues: number[], value: number) {
    this.name = name;
    this.partner = partner;
    this.act = act;
    this.desirabilityValues = desirabilityValues;
    this.honestyValues = honestyValues;
    this.value = value;
  }
}
