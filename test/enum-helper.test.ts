import {
    getEnumKeyValueAsMap,
    getEnumNamesAndValues,
    getEnumValues,
    getKeyByValue,
    isEnumValue,
    parseEnum, prepareEnumKeyValueForScreen, prepareEnumKeyValueForScreenByEnum
} from "../src/enum-helper";

const Status = {
    CREATED: 'CREATED',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
};

export enum StringEnum {
    ONE = "one",
    TWO = "two",
    THREE = "three"
}

export enum NumberEnum {
    ONE,
    TWO,
    THREE
}

export enum TestEnum {
    A = 1,
    B = 'two',
    C = 3,
}

enum TestEnumForObj {
    A = 'One',
    B = 'Two',
    C = 'Three',
}

describe('getEnumKeyValueAsMap', () => {
    test('returns a Map object with key-value pairs of an enum', () => {
        const result = getEnumKeyValueAsMap(TestEnumForObj);
        expect(result).toBeInstanceOf(Map);
        expect(result.size).toBe(3);
        expect(result.get('A')).toBe('One');
        expect(result.get('B')).toBe('Two');
        expect(result.get('C')).toBe('Three');
    });
});

describe('prepareEnumKeyValueForScreen', () => {
    test('returns an array of objects with value and viewValue properties for an enum', () => {
        const result = prepareEnumKeyValueForScreen(TestEnumForObj);
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(3);
        expect(result).toEqual([
            { value: 'A', viewValue: 'One' },
            { value: 'B', viewValue: 'Two' },
            { value: 'C', viewValue: 'Three' },
        ]);
    });
});

describe('prepareEnumKeyValueForScreenByEnum', () => {
    test('returns an array of objects with value and viewValue properties for a subset of an enum', () => {
        const result = prepareEnumKeyValueForScreenByEnum(['A', 'C'], TestEnumForObj);
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(2);
        expect(result).toEqual([
            { value: 'A', viewValue: 'One' },
            { value: 'C', viewValue: 'Three' },
        ]);
    });
})

describe('getKeyByValue', () => {
    test('returns the key for a given value in an object', () => {
        const result = getKeyByValue(TestEnum, 'two');
        expect(result).toBe('B');
    });

    test('returns null if the value is not found in the object', () => {
        const result = getKeyByValue(TestEnum, 'four');
        expect(result).toBe(null);
    });
});

describe('parseEnum', () => {
    test('returns an object with keys and values from an enum', () => {
        const result = parseEnum(NumberEnum);
        expect(result).toEqual({
            "ONE": 0,
            "TWO": 1,
            "THREE": 2
        });
    });
});

describe('getEnumNamesAndValues', () => {
    test('returns an array of objects with name and value properties from an enum', () => {
        const result = getEnumNamesAndValues(NumberEnum);
        expect(result).toEqual([
            {"name": "ONE", "value": 0},
            {"name": "TWO", "value": 1},
            {"name": "THREE", "value": 2}
        ]);
    });
});

describe("test getKeyByValue enum helper method", () => {
    test("should return a value for getKeyByValue(source, value)", () => {
        // @ts-ignore
        return expect(getKeyByValue(StringEnum, 'one')).toBe('ONE');
    });

});

describe('getEnumValues', () => {
    test('returns all values of an enum object', () => {
        expect(getEnumValues(Status)).toEqual(['CREATED', 'IN_PROGRESS', 'COMPLETED']);
    });
});

describe('isEnumValue', () => {
    test('returns true if value is in enum object', () => {
        expect(isEnumValue(Status, 'IN_PROGRESS')).toBe(true);
    });

    test('returns false if value is not in enum object', () => {
        expect(isEnumValue(Status, 'CANCELLED')).toBe(false);
    });
});
