<template>
  <div
    ref="svgContainer"
    :style="{ width: width + 'px', height: height + 'px' }"
    class="inline-block"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  width: {
    type: [Number, String],
    default: 24,
  },
  height: {
    type: [Number, String],
    default: 24,
  },
  color: {
    type: String,
    default: "currentColor",
  },
});

// Fix the type issue by specifying the HTMLDivElement type for the ref
const svgContainer = ref<HTMLDivElement | null>(null);

// Function to fetch SVG content and inject it
const loadSvg = async () => {
  if (!svgContainer.value) return;

  try {
    // Fetch the SVG file
    const response = await fetch(props.icon);
    const svgText = await response.text();

    // Create a DOM parser to work with the SVG
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    const svgElement = svgDoc.querySelector("svg");

    if (svgElement) {
      // Set width and height attributes
      svgElement.setAttribute("width", "100%");
      svgElement.setAttribute("height", "100%");

      // Apply the color to all paths, strokes, and fills
      const pathElements = svgElement.querySelectorAll(
        "path, circle, rect, ellipse, line, polyline, polygon"
      );
      pathElements.forEach((path) => {
        if (path.hasAttribute("fill") && path.getAttribute("fill") !== "none") {
          path.setAttribute("fill", props.color);
        }
        if (
          path.hasAttribute("stroke") &&
          path.getAttribute("stroke") !== "none"
        ) {
          path.setAttribute("stroke", props.color);
        }
      });

      // Replace the container content with the SVG
      svgContainer.value.innerHTML = "";
      svgContainer.value.appendChild(svgElement);
    }
  } catch (error) {
    console.error("Error loading SVG:", error);
  }
};

// Load the SVG when the component is mounted
onMounted(loadSvg);

// Reload the SVG when props change
watch(() => [props.icon, props.color], loadSvg);
</script>
