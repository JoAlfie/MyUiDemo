import { config, VueWrapper, DOMWrapper } from "@vue/test-utils";

// Define the plugin correctly by returning an object
const findByPlugin = (wrapper: VueWrapper<any>) => ({
   findby(testId: string): DOMWrapper<Element> {
      return wrapper.find(`[data-test="${testId}"]`);
   },

   findAllBy(testId: string): DOMWrapper<Element>[] {
      return wrapper.findAll(`[data-test="${testId}"]`);
   },
});

// Install the plugin
config.plugins.VueWrapper.install(findByPlugin);
