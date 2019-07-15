export class POG {
  honesty: number;
  desirability: number;

  constructor(honesty: number, desirability: number) {
    this.honesty = honesty;
    this.desirability = desirability;
  }

  getHonesty() {
    return this.honesty;
  }

  setHonesty(honesty: number) {
    this.honesty = honesty;
  }

  getDesirability() {
    return this.desirability;
  }

  setDesirability(desirability: number) {
    this.desirability = desirability;
  }
}
