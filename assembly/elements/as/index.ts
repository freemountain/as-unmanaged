import {
  AfterAlloc,
  BeforeAlloc,
  GetElementPtr,
  GetLength,
  InsertElement,
  UnmanagedElementsData,
  UnmanagedElementsImpl,
} from "../../core/unmanagedElements";
import { OutOfBoundsException } from "../../errors/OutOfBounds";

@unmanaged
class ASElementsData extends UnmanagedElementsData {
  data!: Array<usize>;
}

@unmanaged
export class ASElementsImpl extends UnmanagedElementsImpl {
  beforeAlloc: BeforeAlloc = (
    elementByteLength: i32,
    elementCapacity: i32,
  ): usize => {
    return offsetof<ASElementsData>();
  };

  afterAlloc: AfterAlloc = (p: usize): void => {
    const data = changetype<ASElementsData>(p);
    data.data = new Array<usize>();
  };

  getLength: GetLength = (p: usize): isize => {
    console.log("GetLength " + changetype<ASElementsData>(p).impl.toString());
    return changetype<ASElementsData>(p).data.length;
  };

  getElementPtr: GetElementPtr = (p: usize, i: i32): usize => {
    const data = changetype<ASElementsData>(p);
    if (i < 0 || i >= data.data.length) {
      throw OutOfBoundsException.create(data.data.length, i);
    }

    return data.data[i];
  };

  insertElement: InsertElement = (p: usize, i: i32): usize => {
    const data = changetype<ASElementsData>(p);

    if (data.data.length == i) {
      const newElement = heap.alloc(data.elementByteLength);
      data.data.push(newElement);
      return newElement;
    }
    throw new Error("can only insert on end");
  };
}
