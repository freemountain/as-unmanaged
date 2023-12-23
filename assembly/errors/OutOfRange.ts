export class OutOfRangeException extends Error {
  constructor(inclusiveMin: number, inclusiveMax: number, actual: number) {
    super(
      actual.toString() +
        "is not in [" +
        inclusiveMin.toString() +
        ", " +
        inclusiveMax.toString() +
        "]",
    );
    this.name = "OutOfRange";
  }
}
