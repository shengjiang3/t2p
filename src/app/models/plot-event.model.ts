export class Plot {
  name: string;
  partner: string;
  act: string;
  preselection: string;
  attributeValues: number;
  fill: boolean;

  constructor(name, partner, act, preselection, attributeValues, fill) {
    this.name = name;
    this.partner = partner;
    this.act = act;
    this.preselection = preselection;
    this.attributeValues = attributeValues;
    this.fill = false;
  }
}
