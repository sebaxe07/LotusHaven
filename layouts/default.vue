<template>
  <div class="flex h-screen bg-primary overflow-x-hidden">
    <!-- Navbar (sidebar on desktop, top bar on mobile) -->
    <UiNavbar />

    <!-- Main Content with responsive padding -->
    <div class="flex-1 overflow-auto lg:ml-0 w-full">
      <!-- Add top padding on mobile for the fixed navbar -->
      <div class="lg:pt-0 pt-16 h-full overflow-x-hidden">
        <slot />
      </div>
    </div>
  </div>
</template>
