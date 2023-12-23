import {
  UnmanagedElementsData,
  UnmanagedElementsImpl,
} from "../core/unmanagedElements";

import { OutOfBoundsException } from "../errors/OutOfBounds";
import { ASElementsImpl } from "./as";

const impls = [new ASElementsImpl()];
function getImpl(implId: i32): UnmanagedElementsImpl {
  console.log(
    "impls.length " + impls.length.toString() + " implId: " + implId.toString(),
  );
  if (implId >= impls.length) {
    throw OutOfBoundsException.create(impls.length, implId);
  }
  return impls[implId];
}
export function create_array(
  implId: i32,
  elementByteLength: i32,
  elementCapacity: i32,
): usize {
  const impl = getImpl(implId);
  const size = impl.beforeAlloc(elementByteLength, elementCapacity);
  const ptr = heap.alloc(size);
  const data = changetype<UnmanagedElementsData>(ptr);
  data.impl = changetype<usize>(impl);
  data.allocatedBytes = size;
  data.elementByteLength = elementByteLength;
  impl.afterAlloc(ptr);

  return ptr;
}

export function array_get_length(p: usize): isize {
  const data = changetype<UnmanagedElementsData>(p);
  const impl = changetype<UnmanagedElementsImpl>(data.impl);
  return impl.getLength(p);
}
export function array_get_element_byte_length(p: usize): i32 {
  const data = changetype<UnmanagedElementsData>(p);
  return data.elementByteLength;
}
export function array_get_element_ptr(p: usize, i: i32): usize {
  const data = changetype<UnmanagedElementsData>(p);
  const impl = changetype<UnmanagedElementsImpl>(data.impl);
  return impl.getElementPtr(p, i);
}

export function array_insert_element(p: usize, i: i32): usize {
  const data = changetype<UnmanagedElementsData>(p);
  const impl = changetype<UnmanagedElementsImpl>(data.impl);
  return impl.insertElement(p, i);
}
