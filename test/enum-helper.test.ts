import { getEnumNamesAndValues, getKeyByValue } from "../src/enum-helper";

export enum StringEnum {
    ONE = "one",
    TWO = "two",
    THREE = "three"
}

export enum StringEnum2 {
    ONE,
    TWO,
    THREE
}


describe("test getKeyByValue enum helper method", () => {
    test("should return a value for getKeyByValue(source, value)", () => {
        // @ts-ignore
        return expect(getKeyByValue(StringEnum, 'one')).toBe('ONE');
    });

});
