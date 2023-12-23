import { NotImplementedException } from "../errors/NotImplemented";

@unmanaged
@final
export class UnmanagedElementsArgs {
  constructor() {}

  elementByteLength: i32 = 0;
}

@unmanaged
export class UnmanagedElementsData {
  constructor() {}
  impl: usize = 0;
  allocatedBytes: usize = 0;
  elementByteLength: i32 = 0;
}

export type BeforeAlloc = (
  elementByteLength: i32,
  elementCapacity: i32,
) => usize;
export type AfterAlloc = (collectionPtr: usize) => void;
export type GetLength = (collectionPtr: usize) => i32;
export type GetElementPtr = (collectionPtr: usize, elementIndex: i32) => usize;
export type InsertElement = (collectionPtr: usize, elementIndex: i32) => usize;
export type CopyElementsTo = (
  collectionPtr: usize,
  targetPtr: usize,
  startIndex: i32,
  inclusiveEndIndex: i32,
) => void;

@unmanaged
export class UnmanagedElementsImpl {
  constructor() {}

  beforeAlloc: BeforeAlloc = (elementByteLength: i32, elementCapacity: i32) => {
    throw new NotImplementedException();
  };

  afterAlloc: AfterAlloc = (collectionPtr: usize) => {
    throw new NotImplementedException();
  };

  getLength: GetLength = (collectionPtr: usize): i32 => {
    throw new NotImplementedException();
  };

  getElementPtr: GetElementPtr = (
    collectionPtr: usize,
    elementIndex: isize,
  ): usize => {
    throw new NotImplementedException();
  };

  insertElement: InsertElement = (
    collectionPtr: usize,
    elementIndex: isize,
  ): usize => {
    throw new NotImplementedException();
  };
}
