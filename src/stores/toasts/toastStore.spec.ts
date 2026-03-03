import { describe, beforeEach, it, expect, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useToastStore, defaultTimeout } from "./toastStore.ts";

describe("toast store", () => {
   beforeEach(() => {
      // creates a fresh pinia and makes it active
      // so it's automatically picked up by any useStore() call
      // without having to pass it to it: `useStore(pinia)`
      setActivePinia(createPinia());
   });

   it("creates an info toast", () => {
      const toast = useToastStore();
      expect(toast.toasts.length).toBe(0);

      toast.info("text");
      // expect toasts array to contain our toast object
      // we don't match exactly because of the generated id
      expect(toast.toasts).toEqual([
         expect.objectContaining({
            text: "text",
            theme: "info",
         }),
      ]);
   });

   it("creates a success toast", () => {
      const toast = useToastStore();
      expect(toast.toasts.length).toBe(0);

      toast.success("success");
      // expect toasts array to contain our toast object
      // we don't match exactly because of the generated id
      expect(toast.toasts).toEqual([
         expect.objectContaining({
            text: "success",
            theme: "success",
         }),
      ]);
   });

   it("creates an error toast", () => {
      const toast = useToastStore();
      expect(toast.toasts.length).toBe(0);

      toast.error("error");
      // expect toasts array to contain our toast object
      // we don't match exactly because of the generated id
      expect(toast.toasts).toEqual([
         expect.objectContaining({
            text: "error",
            theme: "danger",
         }),
      ]);
   });

   it("creates a warning toast", () => {
      const toast = useToastStore();
      expect(toast.toasts.length).toBe(0);

      toast.warning("warning");
      // expect toasts array to contain our toast object
      // we don't match exactly because of the generated id
      expect(toast.toasts).toEqual([
         expect.objectContaining({
            text: "warning",
            theme: "warning",
         }),
      ]);
   });

   it("removes toast after default timeout", () => {
      // mock the timeout
      vi.useFakeTimers();

      // toast is created
      const toast = useToastStore();
      toast.info("I will be removed");

      expect(toast.toasts).toEqual([
         expect.objectContaining({
            text: "I will be removed",
            theme: "info",
         }),
      ]);

      // run out the timeout
      vi.advanceTimersByTime(defaultTimeout);

      // toast has been removed
      expect(toast.toasts.length).toBe(0);
   });

   it("removes toast after custom timeout", () => {
      // mock the timeout
      vi.useFakeTimers();

      // toast is created
      const toast = useToastStore();
      toast.info("I will be removed", { timeout: 1000 });

      expect(toast.toasts).toEqual([
         expect.objectContaining({
            text: "I will be removed",
            theme: "info",
         }),
      ]);

      // run out the timeout
      vi.advanceTimersByTime(1000);

      // toast has been removed
      expect(toast.toasts.length).toBe(0);
   });

   it("handles the removal of multiple toasts", () => {
      // mock the timeout
      vi.useFakeTimers();

      // create multiple toasts
      const toast = useToastStore();
      toast.info("toast one", { timeout: 1000 });
      toast.info("toast two", { timeout: 7000 });
      toast.info("toast three", { timeout: 5000 });

      expect(toast.toasts.length).toBe(3);

      // run out the timeout for the first toast
      vi.advanceTimersByTime(1000);

      // two toasts remain
      expect(toast.toasts.length).toBe(2);

      // correct toasts still in array
      expect(toast.toasts).toEqual([
         expect.objectContaining({
            text: "toast two",
         }),
         expect.objectContaining({
            text: "toast three",
         }),
      ]);

      // run out the timeout for the third toast
      // 4000 + previous 1000 = 5000
      vi.advanceTimersByTime(4000);

      // one toast remains
      // even though second toast was added first,
      // timer length means the third one should have been removed
      expect(toast.toasts.length).toBe(1);
      expect(toast.toasts).toEqual([
         expect.objectContaining({
            text: "toast two",
         }),
      ]);

      // run out final timer
      // 1000 + 4000 + 2000 = 7000
      vi.advanceTimersByTime(2000);

      // all toasts removed
      expect(toast.toasts.length).toBe(0);
   });
});
