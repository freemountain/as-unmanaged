import { OutOfBoundsException } from "../errors/OutOfBounds";
import { OutOfRangeException } from "../errors/OutOfRange";

function toIdx<T>(index: T): isize {
  if (isInteger<T>()) {
    if (isSigned<T>() || sizeof<T>() < sizeof<isize>()) {
      return isize(index);
    } else {
      throw new OutOfRangeException(
        Isize.MIN_VALUE,
        Isize.MAX_VALUE,
        u64(index),
      );
    }
  }
  throw new Error("index must be integer");
}
export function absoluteIndex<T>(collectionLength: isize, index: T): isize {
  const idx = toIdx<T>(index);
  if (idx >= 0) {
    return idx;
  }
  const result = collectionLength - idx;
  if (result < 0) {
    throw OutOfBoundsException.create(0, 0);
  }

  return result;
}
