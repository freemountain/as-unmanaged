async function instantiate(module, imports = {}) {
  const adaptedImports = {
    env: Object.assign(Object.create(globalThis), imports.env || {}, {
      abort(message, fileName, lineNumber, columnNumber) {
        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
        message = __liftString(message >>> 0);
        fileName = __liftString(fileName >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          // @external.js
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      },
      "console.log"(text) {
        // ~lib/bindings/dom/console.log(~lib/string/String) => void
        text = __liftString(text >>> 0);
        console.log(text);
      },
    }),
  };
  const { exports } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf({
    create_array(implId, elementByteLength, elementCapacity) {
      // assembly/elements/index/create_array(i32, i32, i32) => usize
      return exports.create_array(implId, elementByteLength, elementCapacity) >>> 0;
    },
    array_get_element_ptr(p, i) {
      // assembly/elements/index/array_get_element_ptr(usize, i32) => usize
      return exports.array_get_element_ptr(p, i) >>> 0;
    },
    array_insert_element(p, i) {
      // assembly/elements/index/array_insert_element(usize, i32) => usize
      return exports.array_insert_element(p, i) >>> 0;
    },
  }, exports);
  function __liftString(pointer) {
    if (!pointer) return null;
    const
      end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let
      start = pointer >>> 1,
      string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  return adaptedExports;
}
export const {
  memory,
  add,
  create_array,
  array_get_element_ptr,
  array_get_element_byte_length,
  array_get_length,
  array_insert_element,
} = await (async url => instantiate(
  await (async () => {
    try { return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url)); }
    catch { return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url)); }
  })(), {
  }
))(new URL("debug.wasm", import.meta.url));
