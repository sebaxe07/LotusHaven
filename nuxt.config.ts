// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  // Explicitly setting rendering mode to universal (SSR + client-side hydration)
  ssr: true, // Server-Side Rendering enabled
  routeRules: {
    // Apply universal rendering to all routes by default
    "/**": { ssr: true },
  },
  css: ["~/assets/css/main.css", "~/assets/css/scrollbar.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxtjs/supabase",
  ],
  runtimeConfig: {
    public: {
      supabase: {
        redirect: false,
      },
    },
  },
});
