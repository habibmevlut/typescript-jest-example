/**
 * It returns a map object from given enum.
 * NOTE: key/value must be specified in enum class.
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
 * It prepares an object and put in a array with *value and *viewValue properties from given enum.
 * NOTE: key/value must be specified in enum class.
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
 * It prepares an object and put in a array with *value and *viewValue properties from given enumKeys array and enumClass.
 * NOTE: key/value must be specified in enum class.
 * @param enumKeys
 * @param enumClass
 */
export function prepareEnumKeyValueForScreenByEnum(enumKeys: Array<any>, enumClass: any): Array<any> {
    const enumArray = new Array<any>();
    for (const key of enumKeys) {
        enumArray.push({value: key, viewValue: enumClass[key]});
    }
    return enumArray;
}

/**
 * It returns a value from source Enum by given key.
 * enum StringEnum {
 *     ONE = "one",
 *     TWO = "two",
 *     THREE = "three"
 * }
 * getEnumKeyByValue(StringEnum, 'one') => ONE
 * @param source
 * @param value
 */
export function getEnumKeyByValue<T>(source: T, value: string): string {
    const returnedItem: Array<any> = Object.entries(source).filter(a => (a[1] === value));
    return returnedItem.length > 0 ? returnedItem[0][0] : null;
}

/**
 * Convert an enum to an object
 * @param _enum
 */
export function parseEnum(_enum: any) {
    const allValues: (string | number)[] = Object.values(_enum);
    const properties: string[] = allValues.slice(0, allValues.length / 2) as string[];
    const values: (string | number)[] = allValues.slice(allValues.length / 2);
    const enumObj: Record<string, number | string> = {};

    properties.forEach((prop, index) => {
        enumObj[prop] = values[index];
    });

    return enumObj;
}

/**
 * It returns name and values of enum as an object in array
 * export enum StringEnum {
 *     ONE,
 *     TWO,
 * }
 * getEnumNamesAndValues(StringEnum) => [{name: 'ONE', value: 0}, {name: 'TWO', value: 1}];
 * @param _enum
 */
export function getEnumNamesAndValues<T extends (number | string)>(_enum: any) {
    const obj = parseEnum(_enum);
    return Object.keys(obj).map(n => ({name: n, value: obj[n] as T}));
}

/**
 * It returns keys(names) of enum as a array
 * export enum StringEnum {
 *     ONE = "one",
 *     TWO = "two",
 * }
 * getEnumNames(StringEnum) => ['ONE', 'TWO'];
 * @param _enum
 */
export function getEnumNames(_enum: any) {
    if (Object.keys(_enum).length > 0)
        return Object.keys(_enum) as string[];
    return Object.keys(parseEnum(_enum)) as string[];
}

/**
 * It returns value of enum in array
 * export enum StringEnum {
 *     ONE = "one",
 *     TWO = "two",
 * }
 * getEnumValues(StringEnum) => ['one', 'two'];
 * @param _enum
 */
export function getEnumValues<T extends (number | string)>(_enum: any) {
    if (Object.keys(_enum).length > 0)
        return Object.values(_enum) as T[];
    return Object.values(parseEnum(_enum)) as T[];
}

/**
 * It checks the given value is exist in enumObj or not.
 * If it is existed in enum return true.
 * @param enumObj
 * @param value
 */
export function isEnumValue(enumObj, value) {
    return Object.values(enumObj).includes(value);
}
