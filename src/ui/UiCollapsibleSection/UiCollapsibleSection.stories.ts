// @vite-ignore
import type { Meta, StoryObj } from "@storybook/vue3";
import UiCollapsibleSection from "./UiCollapsibleSection.vue";
import { UiIcon, UiPill } from "@/index.ts";
import { COLOUR_THEMES, type ColourTheme } from "../../types/themes.type.ts";

/**
 * A toggleable display section with slots for an icon and content
 *
 * ```
 * <UiCollapsibleSection :title="title prop">
 * <!-- optional icon slot -->
 * <template #icon>
 *  <UiIcon />
 * </template>
 * <!-- optional after title slot -->
 * <template #after-title>
 *  <UiPill text="pill" />
 * </template>
 * <!-- default content slot -->
 *  Content
 * </UiCollapsibleSection>
 * ```
 */
const meta: Meta = {
   title: "UI/UiCollapsibleSection",
   component: UiCollapsibleSection,
   tags: ["autodocs"],
   args: { title: "Collapsible Section" },
   argTypes: {
      theme: {
         control: { type: "select" },
         options: Object.values(COLOUR_THEMES) as ColourTheme[],
      },
   },
} satisfies Meta<typeof UiCollapsibleSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Section: Story = {
   args: { title: "Collapsible Section" },
   render: (args) => ({
      components: { UiCollapsibleSection, UiIcon },
      setup() {
         return { args };
      },
      template: `
             <div style="background-color: #f3f4f6; padding: 4rem;">
                <UiCollapsibleSection v-bind="args">
                    <template #icon>
                        <UiIcon name="heart" />
                    </template>
                    <template #default>
                        Section content
                    </template>
                </UiCollapsibleSection>
             </div>
          `,
   }),
};

export const BorderedSection: Story = {
   args: { title: "Bordered Collapsible Section", bordered: true },
   render: (args) => ({
      components: { UiCollapsibleSection, UiIcon },
      setup() {
         return { args };
      },
      template: `
              <div style="background-color: #f3f4f6; padding: 4rem;">
                 <UiCollapsibleSection v-bind="args">
                     <template #icon>
                         <UiIcon name="heart" />
                     </template>
                     <template #default>
                         Section content
                     </template>
                 </UiCollapsibleSection>
              </div>
           `,
   }),
};

export const ClosedByDefault: Story = {
   args: { title: "Collapsible Section, closed by default", openByDefault: false },
   render: (args) => ({
      components: { UiCollapsibleSection, UiIcon },
      setup() {
         return { args };
      },
      template: `
               <div style="background-color: #f3f4f6; padding: 4rem;">
                  <UiCollapsibleSection v-bind="args">
                      <template #icon>
                          <UiIcon name="heart" />
                      </template>
                      <template #default>
                          Section content
                      </template>
                  </UiCollapsibleSection>
               </div>
            `,
   }),
};

export const AfterTitleSlot: Story = {
   args: { title: "Collapsible Section using after title slot" },
   render: (args) => ({
      components: { UiCollapsibleSection, UiIcon, UiPill },
      setup() {
         return { args };
      },
      template: `
               <div style="background-color: #f3f4f6; padding: 4rem; --pill-background-colour: var(--grey-10);">
                  <UiCollapsibleSection v-bind="args">
                      <template #icon>
                          <UiIcon name="heart" />
                      </template>
                      <template #after-title>
                        <UiPill text="example pill" />
                      </template>
                      <template #default>
                          Section content
                      </template>
                  </UiCollapsibleSection>
               </div>
            `,
   }),
};

export const SmoothTransition: Story = {
   args: {
      title: "Smooth Transition Collapsible Section",
      smoothTransition: true,
      openByDefault: false,
   },
   render: (args) => ({
      components: { UiCollapsibleSection, UiIcon },
      setup() {
         return { args };
      },
      template: `
               <div style="background-color: #f3f4f6; padding: 4rem;">
                  <UiCollapsibleSection v-bind="args">
                      <template #default>
                          <p>This section has smooth transitions enabled. Click the header to see the smooth open/close animation.</p>
                          <p>You can include multiple paragraphs and other content that will animate smoothly.</p>
                          <ul>
                              <li>List items</li>
                              <li>More content</li>
                              <li>Even more content to demonstrate the smooth height transition</li>
                          </ul>
                      </template>
                  </UiCollapsibleSection>
               </div>
            `,
   }),
};

export const ColorThemes: Story = {
   render: () => ({
      components: { UiCollapsibleSection, UiIcon },
      template: `
               <div style="background-color: #f3f4f6; padding: 4rem; display: flex; flex-direction: column; gap: 2rem;">
                  <h3>Color Theme Examples</h3>
                  
                  <!-- Brand Theme -->
                  <UiCollapsibleSection 
                     title="Brand Theme (Light)" 
                     :bordered="true"
                     :smooth-transition="true"
                     theme="brand"
                     :dark-mode="false"
                  >
                     <template #icon>
                        <UiIcon name="star" />
                     </template>
                     <template #default>
                        <p>This accordion uses the brand theme with light mode. Perfect for highlighting important content.</p>
                        <p>You can include <strong>formatted text</strong> and even <a href="#">button links</a>.</p>
                     </template>
                  </UiCollapsibleSection>

                  <!-- Brand Theme Dark -->
                  <UiCollapsibleSection 
                     title="Brand Theme (Dark)" 
                     :bordered="true"
                     :smooth-transition="true"
                     theme="brand"
                     :dark-mode="true"
                  >
                     <template #icon>
                        <UiIcon name="star" />
                     </template>
                     <template #default>
                        <p>This accordion uses the brand theme with dark mode. Great for creating visual contrast.</p>
                        <p>Dark mode themes work well for <strong>emphasis</strong> and <a href="#">call-to-action</a> content.</p>
                     </template>
                  </UiCollapsibleSection>

                  <!-- Purple Theme -->
                  <UiCollapsibleSection 
                     title="Purple Theme (Light)" 
                     :bordered="true"
                     :smooth-transition="true"
                     theme="purple"
                     :dark-mode="false"
                  >
                     <template #icon>
                        <UiIcon name="heart" />
                     </template>
                     <template #default>
                        <p>Purple theme provides a softer, more elegant appearance for content sections.</p>
                        <p>Ideal for <em>informational content</em> and <a href="#">secondary actions</a>.</p>
                     </template>
                  </UiCollapsibleSection>

                  <!-- Green Theme -->
                  <UiCollapsibleSection 
                     title="Green Theme (Light)" 
                     :bordered="true"
                     :smooth-transition="true"
                     theme="green"
                     :dark-mode="false"
                  >
                     <template #icon>
                        <UiIcon name="check-circle" />
                     </template>
                     <template #default>
                        <p>Green theme is perfect for success messages, positive content, and confirmation sections.</p>
                        <p>Great for <strong>success stories</strong> and <a href="#">positive actions</a>.</p>
                     </template>
                  </UiCollapsibleSection>

                  <!-- Orange Theme -->
                  <UiCollapsibleSection 
                     title="Orange Theme (Light)" 
                     :bordered="true"
                     :smooth-transition="true"
                     theme="yellow"
                     :dark-mode="false"
                  >
                     <template #icon>
                        <UiIcon name="warning-triangle" />
                     </template>
                     <template #default>
                        <p>Orange theme works well for warnings, important notices, and attention-grabbing content.</p>
                        <p>Use for <strong>warnings</strong> and <a href="#">urgent actions</a>.</p>
                     </template>
                  </UiCollapsibleSection>

                  <!-- Neutral Theme -->
                  <UiCollapsibleSection 
                     title="Neutral Theme (Dark)" 
                     :bordered="true"
                     :smooth-transition="true"
                     theme="neutral"
                     :dark-mode="true"
                  >
                     <template #icon>
                        <UiIcon name="info-circle" />
                     </template>
                     <template #default>
                        <p>Neutral theme provides a clean, professional appearance for general content.</p>
                        <p>Perfect for <strong>standard information</strong> and <a href="#">regular actions</a>.</p>
                     </template>
                  </UiCollapsibleSection>
               </div>
            `,
   }),
};
