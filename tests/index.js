import assert from "assert";
import {
  create_array,
  array_get_element_ptr,
  array_get_element_byte_length,
  array_get_length,
  array_insert_element,
  memory,
} from "../build/debug.js";
import { array_get_element_uint, array_set_element_uint } from "./utils.js";

const a = create_array(0, 4, -1);
assert.strictEqual(array_get_length(a), 0);

array_insert_element(a, 0);
assert.strictEqual(array_get_length(a), 1);
const firstPtr = array_get_element_ptr(a, 0);

array_insert_element(a, 1);
assert.strictEqual(array_get_length(a), 2);
const secondPtr = array_get_element_ptr(a, 1);

assert.notStrictEqual(firstPtr, secondPtr);

array_set_element_uint(a, 0, 3);
assert.strictEqual(array_get_element_uint(a, 0), 3);

array_set_element_uint(a, 1, 5);
assert.strictEqual(array_get_element_uint(a, 1), 5);
