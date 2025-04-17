<template>
  <div class="flex h-screen">
    <!-- Left Sidebar -->
    <div class="w-64 bg-primary-accent h-full shadow-lg p-4">
      <h1 class="text-xl font-bold mb-6">Lotus Haven</h1>
      <SideNavigation />
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-6 overflow-auto">
      <slot />
    </div>
  </div>
</template>
