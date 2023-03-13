import {
    getEnumKeyByValue, getEnumKeyValueAsMap, getEnumNames, getEnumNamesAndValues, getEnumValues,
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

/**
 * SUCCESS TEST CASES
 */
describe("SUCCESS TEST CASE", () => {
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
                {value: 'A', viewValue: 'One'},
                {value: 'B', viewValue: 'Two'},
                {value: 'C', viewValue: 'Three'},
            ]);
        });
    });

    describe('prepareEnumKeyValueForScreenByEnum', () => {
        test('returns an array of objects with value and viewValue properties for a subset of an enum', () => {
            const result = prepareEnumKeyValueForScreenByEnum(['A', 'C'], TestEnumForObj);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(2);
            expect(result).toEqual([
                {value: 'A', viewValue: 'One'},
                {value: 'C', viewValue: 'Three'},
            ]);
        });
    })

    describe('getEnumKeyByValue', () => {
        test('returns the key for a given value in an object', () => {
            const result = getEnumKeyByValue(TestEnum, 'two');
            expect(result).toBe('B');
        });

        test('returns null if the value is not found in the object', () => {
            const result = getEnumKeyByValue(TestEnum, 'four');
            expect(result).toBe(null);
        });
    });

    describe('getEnumNames', () => {
        it('should return an array of enum keys', () => {
            expect(getEnumNames(StringEnum)).toEqual(["ONE", "TWO", "THREE"]);
        });

        it('should return an empty array if the input enum is empty', () => {
            expect(getEnumNames({})).toEqual([]);
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

    describe("getEnumKeyByValue", () => {
        test("should return a value for getEnumKeyByValue(source, value)", () => {
            // @ts-ignore
            return expect(getEnumKeyByValue(StringEnum, 'one')).toBe('ONE');
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
})


/**
 * FAIL TEST CASES
 */
describe("FAIL TEST CASES", () => {
    describe("getEnumKeyValueAsMap function  fail test cases", () => {

        test('should return a Map containing key-value pairs of an enum', () => {
            enum ExampleEnum {
                Foo = 'bar',
                Baz = 'qux',
            }

            const result = getEnumKeyValueAsMap(ExampleEnum);
            expect(result).toBeInstanceOf(Map);
            expect(result.size).toBe(2);
            expect(result.get('Foo')).toBe('baz'); // incorrect expected value
            expect(result.get('Baz')).toBe('qux');
        });

        test("should throw an error if an array is passed as argument", () => {
            expect(() => {
                getEnumKeyValueAsMap(["value1", "value2"]);
            }).toThrow();
        });

        test("should throw an error if an object is passed as argument", () => {
            expect(() => {
                getEnumKeyValueAsMap({key1: "value1", key2: "value2"});
            }).toThrow();
        });

        test("should throw an error if a number is passed as argument", () => {
            expect(() => {
                getEnumKeyValueAsMap(123);
            }).toThrow();
        });
    });

    describe("prepareEnumKeyValueForScreen function fail test cases", () => {
        test('should throw an error if value is not an object', () => {
            expect(() => {
                prepareEnumKeyValueForScreen(123);
            }).toThrow(TypeError);
        });
        test('prepareEnumKeyValueForScreen should throw error when input value is null or undefined', () => {
            expect(() => prepareEnumKeyValueForScreen(null)).toThrow("It should have enum value");
            expect(() => prepareEnumKeyValueForScreen(undefined)).toThrow("It should have enum value");
        });
        test('prepareEnumKeyValueForScreen should throw an error if passed a non-enum object', () => {
            expect(() => {
                prepareEnumKeyValueForScreen({foo: 'bar'});
            }).toThrowError(TypeError);
        });
    });

    describe('prepareEnumKeyValueForScreenByEnum function fail test cases', () => {
        enum TestEnum {
            Value1 = 'Test Value 1',
            Value2 = 'Test Value 2',
            Value3 = 'Test Value 3'
        }

        test('should return an array of objects with value and viewValue properties based on provided enum keys', () => {
            const result = prepareEnumKeyValueForScreenByEnum([TestEnum.Value1, TestEnum.Value2], TestEnum);
            expect(result).toEqual([
                {value: 'Value1', viewValue: 'Test Value 1'},
                {value: 'Value2', viewValue: 'Test Value 2'}
            ]);
        });

        test('should return an empty array if no enum keys are provided', () => {
            const result = prepareEnumKeyValueForScreenByEnum([], TestEnum);
            expect(result).toEqual(null);
        });

        test('should throw an error if a non-enumerable object is provided as the enum', () => {
            expect(() => {
                prepareEnumKeyValueForScreenByEnum([TestEnum.Value1], {test: 'invalid enum object'});
            }).toThrow();
        });

        test('should throw an error if an invalid enum key is provided', () => {
            expect(() => {
                prepareEnumKeyValueForScreenByEnum(['InvalidKey'], TestEnum);
            }).toThrow();
        });
    });

    describe('getEnumKeyByValue function fail test cases', () => {
        enum TestEnum {
            Foo = "foo",
            Bar = "bar",
            Baz = "baz"
        }

        test("returns null if no matching value found", () => {
            expect(getEnumKeyByValue(TestEnum, "qux")).toBe([]);
        });

        test("throws an error if the source is not an enum", () => {
            const source = {foo: "bar", baz: "qux"};
            expect(() => {
                getEnumKeyByValue(source, "bar");
            }).toThrow();
        });

        test("throws an error if the value is not a string", () => {
            expect(() => {
                // @ts-ignore
                getEnumKeyByValue(TestEnum, 123);
            }).toThrow();
        });

    });

    describe('parseEnum function fail test cases', () => {
        test('parseEnum should throw an error if the argument is not an enum', () => {
            expect(() => {
                parseEnum(null);
            }).toThrow();

            expect(() => {
                parseEnum(undefined);
            }).toThrow();

            expect(() => {
                parseEnum(42);
            }).toThrow();

            expect(() => {
                parseEnum('foo');
            }).toThrow();

            expect(() => {
                parseEnum({});
            }).toThrow();

            expect(() => {
                parseEnum([]);
            }).toThrow();
        });

        test('parseEnum should throw an error if the argument is an empty enum', () => {
            const enumObj = {};
            expect(() => {
                parseEnum(enumObj);
            }).toThrow();
        });

    });

    describe('getEnumNamesAndValues function fail test cases', () => {
        test('getEnumNamesAndValues should throw an error for invalid input', () => {
            expect(() => getEnumNamesAndValues(null)).toThrow("This should be a enum value");
        });

        test('getEnumNamesAndValues should throw an error if the argument is not an enum', () => {
            expect(() => getEnumNamesAndValues({})).toThrowError(TypeError);
        });

        test('getEnumNamesAndValues should return an empty array if the enum is empty', () => {
            enum EmptyEnum {}

            expect(getEnumNamesAndValues(EmptyEnum)).toEqual(null);
        });

    });

    describe('getEnumNames function fail test case', () => {
        test('getEnumNames returns an empty array when the provided enum is null', () => {
            const enumNull = null;
            expect(getEnumNames(enumNull)).toEqual([]);
        });

        test('getEnumNames returns an empty array when the provided enum is undefined', () => {
            const enumUndefined = undefined;
            expect(getEnumNames(enumUndefined)).toEqual([]);
        });

        test('getEnumNames returns an array of number keys when the provided enum is a numeric enum', () => {
            enum Status {
                Active = 1,
                Inactive = 0,
                Pending = 2
            }

            const enumNumeric = Status;
            expect(getEnumNames(enumNumeric)).toEqual(['Active', 'Inactive', 'Pending']);
        });

    });

    describe('getEnumValues function fail test case', () => {
        test('returns empty array if input is null', () => {
            expect(getEnumValues(null)).toEqual([]);
        });

        enum TestEnum {
            Value1 = 1,
            Value2 = 2,
            Value3 = 3
        }

        test("Returns array of number values when given enum with only number values", () => {
            expect(getEnumValues(TestEnum)).toEqual([1, 2, 3]);
        });

        enum TestEnum2 {
            Value1 = "VALUE_1",
            Value2 = "VALUE_2",
            Value3 = "VALUE_3"
        }

        test("Returns array of string values when given enum with only string values", () => {
            expect(getEnumValues(TestEnum2)).toEqual(["1", "1", "1"]);
        });

        enum TestEnum3 {
            Value1 = 1,
            Value2 = "VALUE_2",
            Value3 = 3
        }

        test("Returns array of mixed string and number values when given enum with mixed values", () => {
            expect(getEnumValues(TestEnum3)).toEqual([1, "VALUE_2", 3]);
        });
    });

    describe('isEnumValue function fail test case', () => {
        enum TestEnum {
            A = 'a',
            B = 'b',
            C = 'c',
        }

        test('isEnumValue should return false if value is not in the enum object', () => {
            expect(isEnumValue(TestEnum, 'k')).toBe(true);
        });

        test('isEnumValue should return false if value is undefined', () => {
            expect(isEnumValue(TestEnum, [])).toBe(true);
        });

        test('isEnumValue should return false if enum object is null', () => {
            expect(isEnumValue(null, 'a')).toBe(false);
        });

    });

})

