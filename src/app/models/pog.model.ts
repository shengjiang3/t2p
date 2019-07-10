export class POG {
  honesty: number;
  desirability: number;

  constructor(honesty: number, desirability: number) {
    this.honesty = honesty;
    this.desirability = desirability;
  }

  get getHonesty(): number {
    return this.honesty;
  }

  set setHonesty(honesty: number) {
    this.honesty = honesty;
  }

  get getDesirability(): number {
    return this.desirability;
  }

  set setDesirability(desirability: number) {
    this.desirability = desirability;
  }
}
