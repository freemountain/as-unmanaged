export class NotImplementedException extends Error {
  constructor() {
    super("Not implemented");
    this.name = "NotImplemented";
  }
}
