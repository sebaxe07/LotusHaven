<template>
  <div class="flex h-screen bg-primary">
    <!-- Left Sidebar -->
    <UiNavbar />
    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <slot />
    </div>
  </div>
</template>
