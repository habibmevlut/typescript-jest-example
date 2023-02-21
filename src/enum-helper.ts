/**
 *
 * @param value
 */
export function getEnumKeyValueAsMap<T>(value: T): Map<string, string> {
    const map = new Map<string, string>();
    for (const key of Object.keys(value)) {
        map.set(key, value[key]);
    }
    return map;
}

/**
 *
 * @param value
 */
export function prepareEnumKeyValueForScreen<T>(value: T): T[] {
    const enumArray = [];
    for (const key of Object.keys(value)) {
        enumArray.push({value: key, viewValue: value[key]});
    }
    return enumArray;
}

/**
 *
 * @param val1
 * @param val2
 */
export function getEnumKeyByValue<T>(val1: T, val2: T): string {
    const returnedItem: Array<any> = Object.entries(val1).filter(a => (a[1] === val2));
    return returnedItem.length > 0 ? returnedItem[0][0] : null;
}
