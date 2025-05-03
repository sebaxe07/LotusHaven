<template>
  <div class="w-full aspect-square relative bg-gradient-to-br  rounded-lg overflow-hidden">
    <svg viewBox="0 0 400 400" class="w-full h-full">
      <!-- Decorative circles -->
      <circle cx="200" cy="200" r="150" fill="none" stroke="var(--color-primary-accent)" stroke-width="2" opacity="0.3"/>
      <circle cx="200" cy="200" r="120" fill="none" stroke="var(--color-third-accent)" stroke-width="2" opacity="0.4"/>
      <circle cx="200" cy="200" r="90" fill="none" stroke="var(--color-primary-accent)" stroke-width="2" opacity="0.5"/>
      
      <!-- Lotus petals -->
      <path d="M200 150 Q230 100 200 50 Q170 100 200 150" fill="var(--color-primary-accent)" opacity="0.6"/>
      <path d="M250 175 Q300 145 300 95 Q250 125 250 175" fill="var(--color-third-accent)" opacity="0.6"/>
      <path d="M150 175 Q100 145 100 95 Q150 125 150 175" fill="var(--color-third-accent)" opacity="0.6"/>
      
      <!-- Center circle -->
      <circle cx="200" cy="200" r="30" fill="var(--color-primary-accent)" opacity="0.8"/>
    </svg>
  </div>
</template>