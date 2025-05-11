<template>
  <div
    ref="svgContainer"
    :style="{ width: width + 'px', height: height + 'px' }"
    class="inline-block"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

/**
 * Component props definition with validation
 */
const props = defineProps({
  /**
   * Path to the SVG file to be loaded and displayed
   */
  icon: {
    type: String,
    required: true,
  },
  /**
   * Icon width in pixels
   * Can be provided as number or string
   */
  width: {
    type: [Number, String],
    default: 24,
  },
  /**
   * Icon height in pixels
   * Can be provided as number or string
   */
  height: {
    type: [Number, String],
    default: 24,
  },
  /**
   * Color to apply to SVG elements
   * Uses CSS color values or "currentColor" to inherit from parent
   */
  color: {
    type: String,
    default: "currentColor",
  },
});

/**
 * Reference to the DOM element that will contain the SVG
 * Typed as HTMLDivElement for proper TypeScript support
 */
const svgContainer = ref<HTMLDivElement | null>(null);

/**
 * Dynamically fetches and processes SVG content from a URL
 * Handles sizing, coloring, and DOM injection of the SVG
 */
const loadSvg = async () => {
  if (!svgContainer.value) return;
  try {
    // Fetch the SVG file from the provided URL
    const response = await fetch(props.icon);
    const svgText = await response.text();

    // Parse the SVG string into a manipulable DOM structure
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    const svgElement = svgDoc.querySelector("svg");
    if (svgElement) {
      // Configure SVG to fill container responsively
      svgElement.setAttribute("width", "100%");
      svgElement.setAttribute("height", "100%");

      // Apply the specified color to all SVG elements that have fill or stroke attributes
      // This preserves "none" values to maintain transparent backgrounds and empty shapes
      const pathElements = svgElement.querySelectorAll(
        "path, circle, rect, ellipse, line, polyline, polygon"
      );
      pathElements.forEach((path) => {
        // Only update fill colors that aren't explicitly set to "none"
        if (path.hasAttribute("fill") && path.getAttribute("fill") !== "none") {
          path.setAttribute("fill", props.color);
        }
        // Only update stroke colors that aren't explicitly set to "none"
        if (
          path.hasAttribute("stroke") &&
          path.getAttribute("stroke") !== "none"
        ) {
          path.setAttribute("stroke", props.color);
        }
      }); // Clear any existing content and inject the modified SVG
      svgContainer.value.innerHTML = "";
      svgContainer.value.appendChild(svgElement);
    }
  } catch (error) {
    console.error("Error loading SVG:", error);
  }
};

/**
 * Initialize SVG loading when component is mounted
 * This ensures the SVG is rendered as soon as the component enters the DOM
 */
onMounted(loadSvg);

/**
 * Watch for changes to icon path or color props
 * Automatically reloads and reprocesses the SVG when these props change
 */
watch(() => [props.icon, props.color], loadSvg);
</script>
