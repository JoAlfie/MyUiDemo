import { describe, it, expect } from "vitest";
import isDeepEqual from "./isDeepEqual.utils.ts";

describe("isDeepEqual()", () => {
   // it throws a type error when compared items are not of same type

   describe("correctly handles objects", () => {
      it("Returns true when two identical objects are passed", () => {
         const objectOne = { key: "value", key2: "value2" };
         const objectTwo = { key: "value", key2: "value2" };

         expect(isDeepEqual(objectOne, objectTwo)).toBe(true);
      });

      it("Returns true when two identical objects are passed with keys in a different order", () => {
         const objectOne = { key2: "value2", key: "value" };
         const objectTwo = { key: "value", key2: "value2" };

         expect(isDeepEqual(objectOne, objectTwo)).toBe(true);
      });

      it("Returns true when idential nested objects are passed", () => {
         const objectOne = { key: "value", key2: { x: "y", y: "z" } };
         const objectTwo = { key: "value", key2: { x: "y", y: "z" } };

         expect(isDeepEqual(objectOne, objectTwo)).toBe(true);
      });

      it("Returns true when two identical nested objects are passed with keys in a different order", () => {
         const objectOne = { key: "value", key2: { y: "z", x: "y" } };
         const objectTwo = { key2: { x: "y", y: "z" }, key: "value" };

         expect(isDeepEqual(objectOne, objectTwo)).toBe(true);
      });

      it("Returns false when two different objects are passed", () => {
         const objectOne = { key: "value", key2: "value2" };
         const objectTwo = { key: "value", key2: "foo" };

         expect(isDeepEqual(objectOne, objectTwo)).toBe(false);
      });

      it("Returns false when different nested objects are passed", () => {
         const objectOne = { key: "value", key2: { x: "y", y: "z" } };
         const objectTwo = { key: "value", key2: { x: "y", y: "foo" } };

         expect(isDeepEqual(objectOne, objectTwo)).toBe(false);
      });
   });

   describe("correctly handles strings", () => {
      it("Returns true when identical strings are passed", () => {
         const stringOne = "foo";
         const stringTwo = "foo";

         expect(isDeepEqual(stringOne, stringTwo)).toBe(true);
      });

      it("Returns false when different strings are passed", () => {
         const stringOne = "foo";
         const stringTwo = "bar";

         expect(isDeepEqual(stringOne, stringTwo)).toBe(false);
      });
   });

   describe("correctly handles arrays", () => {
      it("Returns true when identical arrays are passed", () => {
         const arrayOne = [1, 2, 3];
         const arrayTwo = [1, 2, 3];

         expect(isDeepEqual(arrayOne, arrayTwo)).toBe(true);
      });

      it("Returns false when different arrays are passed", () => {
         const arrayOne = [1, 2, 3];
         const arrayTwo = [4, 5, 6];

         expect(isDeepEqual(arrayOne, arrayTwo)).toBe(false);
      });

      it("Returns true when two arrays of identical objects are passed", () => {
         const arrayOne = [
            { key2: { x: "y", y: "z" }, key: "value" },
            { key: "value", key2: { y: "z", x: "y" } },
         ];
         const arrayTwo = [
            { key: "value", key2: { y: "z", x: "y" } },
            { key2: { x: "y", y: "z" }, key: "value" },
         ];

         expect(isDeepEqual(arrayOne, arrayTwo)).toBe(true);
      });
   });
});
