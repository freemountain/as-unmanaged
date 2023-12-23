function getMsg(length: i64, index: i64): string {
  if (index < 0) {
    return "Negative Index " + index.toString() + " is not allowed";
  }
  return (
    "Index " +
    index.toString() +
    "is out of bounds (length: " +
    length.toString()
  );
}
export class OutOfBoundsException extends Error {
  static create(length: i64, index: i64): OutOfBoundsException {
    const e = new OutOfBoundsException(getMsg(length, index));
    e.name = "OutOfBounds";
    return e;
  }
}
