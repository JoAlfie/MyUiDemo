import { DOMWrapper } from "@vue/test-utils";

declare module "@vue/test-utils" {
   interface VueWrapper {
      findby(testId: string): DOMWrapper<Element>;
      findAllBy(testId: string): DOMWrapper<Element>[];
   }
}
