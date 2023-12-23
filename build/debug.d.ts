/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * assembly/index/add
 * @param a `i32`
 * @param b `i32`
 * @returns `i32`
 */
export declare function add(a: number, b: number): number;
/**
 * assembly/elements/index/create_array
 * @param implId `i32`
 * @param elementByteLength `i32`
 * @param elementCapacity `i32`
 * @returns `usize`
 */
export declare function create_array(implId: number, elementByteLength: number, elementCapacity: number): number;
/**
 * assembly/elements/index/array_get_element_ptr
 * @param p `usize`
 * @param i `i32`
 * @returns `usize`
 */
export declare function array_get_element_ptr(p: number, i: number): number;
/**
 * assembly/elements/index/array_get_element_byte_length
 * @param p `usize`
 * @returns `i32`
 */
export declare function array_get_element_byte_length(p: number): number;
/**
 * assembly/elements/index/array_get_length
 * @param p `usize`
 * @returns `isize`
 */
export declare function array_get_length(p: number): number;
/**
 * assembly/elements/index/array_insert_element
 * @param p `usize`
 * @param i `i32`
 * @returns `usize`
 */
export declare function array_insert_element(p: number, i: number): number;
