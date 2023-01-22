import EventEmitter from "events";

export class FaceSolver extends EventEmitter {
  static instance: FaceSolver;
  static getInstance(): FaceSolver {
    if (!FaceSolver.instance) {
      FaceSolver.instance = new FaceSolver();
    }
    return FaceSolver.instance;
  }
  private constructor() {
    super();
  }
  solve() {
    console.log("solve");
  }
}
