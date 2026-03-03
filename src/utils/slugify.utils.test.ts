import { describe, it, expect } from "vitest";
import slugify from "./slugify.utils.ts";

describe("slugify()", () => {
   describe("handles basic string conversion", () => {
      it("converts simple strings to lowercase", () => {
         expect(slugify("Hello World")).toBe("hello-world");
         expect(slugify("TEST STRING")).toBe("test-string");
      });

      it("removes special characters", () => {
         expect(slugify("Hello! World?")).toBe("hello-world");
         expect(slugify("Test@#$%^&*()String")).toBe("test-string");
      });

      it("handles multiple spaces and special characters", () => {
         expect(slugify("Hello   World!!!")).toBe("hello-world");
         expect(slugify("Test---String")).toBe("test-string");
      });
   });

   describe("handles accented characters", () => {
      it("removes accents from characters", () => {
         expect(slugify("résumé")).toBe("resume");
         expect(slugify("café")).toBe("cafe");
         expect(slugify("naïve")).toBe("naive");
      });

      it("handles multiple accented characters", () => {
         expect(slugify("crème brûlée")).toBe("creme-brulee");
         expect(slugify("voilà ça marche")).toBe("voila-ca-marche");
      });
   });

   describe("handles numbers", () => {
      it("adds underscore prefix to numbers at start", () => {
         expect(slugify("123test")).toBe("_123test");
         expect(slugify("1-2-3")).toBe("_1-2-3");
      });

      it("handles numbers in middle and end", () => {
         expect(slugify("test123")).toBe("test123");
         expect(slugify("test-123")).toBe("test-123");
      });
   });

   describe("handles edge cases", () => {
      it("handles empty strings", () => {
         expect(slugify("")).toBe("");
      });

      it("handles strings with only special characters", () => {
         expect(slugify("!@#$%^&*()")).toBe("");
         expect(slugify("   ")).toBe("");
      });

      it("handles strings with control characters", () => {
         expect(slugify("hello\u0000world")).toBe("helloworld");
         expect(slugify("test\u001fstring")).toBe("teststring");
      });
   });

   describe("handles complex combinations", () => {
      it("handles mixed case, accents, and special characters", () => {
         expect(slugify("Hello World! 123")).toBe("hello-world-123");
         expect(slugify("Résumé & CV (2023)")).toBe("resume-cv-2023");
      });

      it("handles multiple consecutive special characters", () => {
         expect(slugify("Hello---World!!!")).toBe("hello-world");
         expect(slugify("Test...String")).toBe("test-string");
      });
   });
});
