<template>
  <div
    class="w-72 bg-secondary h-full shadow-xl flex flex-col items-center border-r border-third-accent/50"
  >
    <!-- Logo and Title Section -->
    <div class="flex flex-col space-y-4 items-center justify-center pt-8 pb-6">
      <NuxtLink
        to="/"
        aria-label="Go to homepage"
        class="transition-transform hover:scale-105"
      >
        <nuxt-img
          src="/images/logo.svg"
          alt="Logo"
          width="100"
          height="100"
          class="drop-shadow-md"
        />
      </NuxtLink>

      <h1 class="text-2xl font-bold text-primary-accent tracking-wide">
        Lotus Haven
      </h1>
    </div>

    <!-- Divider -->
    <div class="w-3/4 h-px bg-third-accent/50 mb-6"></div>

    <!-- Navigation Links -->
    <div class="w-full px-4 flex-grow">
      <SideNavigation />
    </div>

    <!-- Footer Section -->
    <div class="w-full p-6 border-t border-third-accent/50 mt-auto">
      <!-- Social Icons -->
      <div class="flex justify-center space-x-4 mb-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Facebook page"
          class="social-icon-link"
        >
          <nuxt-img
            src="/icons/facebook.svg"
            alt="Facebook"
            width="20"
            height="20"
            class="social-icon"
          />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Twitter profile"
          class="social-icon-link"
        >
          <nuxt-img
            src="/icons/twitter.svg"
            alt="Twitter"
            width="20"
            height="20"
            class="social-icon"
          />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our LinkedIn page"
          class="social-icon-link"
        >
          <nuxt-img
            src="/icons/linkedin.svg"
            alt="LinkedIn"
            width="20"
            height="20"
            class="social-icon"
          />
        </a>
      </div>

      <!-- Copyright Text -->
      <p class="text-secondary-text text-xs text-center">
        &copy; 2025 HyperDaGiaZeySe.<br />
        All rights reserved.
      </p>
    </div>
  </div>
</template>

<style scoped>
.social-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(
    207,
    218,
    217,
    0.8
  ); /* Brighter version of third-accent */
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.social-icon-link:hover {
  background-color: var(--color-primary-accent);
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.social-icon {
  transition: filter 0.2s ease;
}

.social-icon-link:hover .social-icon {
  filter: brightness(0) invert(1); /* Make icon white on hover */
}
</style>
