import {
  array_get_element_ptr,
  array_get_element_byte_length,
  memory,
} from "../build/debug.js";

const memoryView = new DataView(memory.buffer);

export const printMemorySize = () =>
  console.log("Memory Size: " + memory.buffer.byteLength);

const getSetterFor = (method, type, elementByteLength) => {
  if (!["set", "get"].includes(method)) {
    throw new Error(
      `Expected method to be "set" or "get" (actual: "${method}")`,
    );
  }

  const typeName = `${type[0].toUpperCase()}${type.slice(1)}`;
  let setterName = `${method}${typeName}${elementByteLength * 8}`;
  const result = memoryView[setterName];

  if (typeof result !== "function") {
    throw new Error(`Could not find method "${setterName}"`);
  }

  return result.bind(memoryView);
};
export const array_set_element_uint = (p, i, e) => {
  const elementPtr = array_get_element_ptr(p, i);
  const elementByteLength = array_get_element_byte_length(p);

  const setter = getSetterFor("set", "uint", elementByteLength);
  setter(elementPtr, e);
};

export const array_get_element_uint = (p, i) => {
  const elementPtr = array_get_element_ptr(p, i);
  const elementByteLength = array_get_element_byte_length(p);

  const getter = getSetterFor("get", "uint", elementByteLength);
  return getter(elementPtr);
};
