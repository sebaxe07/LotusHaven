<template>
  <div
    class="w-72 bg-secondary h-full shadow-lg p-4 flex flex-col items-center justify-between border-r-2 border-primary-text"
  >
    <!-- Logo -->
    <div class="flex flex-col space-y-5 items-center justify-center mt-5">
      <NuxtLink to="/" aria-label="Go to homepage">
        <nuxt-img src="/images/logo.svg" alt="Logo" width="156" height="156" />
      </NuxtLink>

      <h1 class="header2 text-primary-accent">Lotus Haven</h1>
    </div>
    <!-- Navigation Links -->
    <SideNavigation />
    <!-- Footer -->
    <div class="w-full">
      <!-- Socials -->
      <div class="flex flex-row gap-0.5">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Facebook page"
        >
          <nuxt-img
            src="icons/facebook.svg"
            alt="Facebook"
            width="24"
            height="24"
            class="hover:opacity-80 transition-opacity"
          />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Twitter profile"
        >
          <nuxt-img
            src="icons/twitter.svg"
            alt="Twitter"
            width="24"
            height="24"
            class="hover:opacity-80 transition-opacity"
          />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our LinkedIn page"
        >
          <nuxt-img
            src="icons/linkedin.svg"
            alt="LinkedIn"
            width="24"
            height="24"
            class="hover:opacity-80 transition-opacity"
          />
        </a>
      </div>

      <p class="text-primary-accent mt-2">
        &copy; 2025 HyperDaGiaZeySe. <br />
        All rights reserved.
      </p>
    </div>
  </div>
</template>
