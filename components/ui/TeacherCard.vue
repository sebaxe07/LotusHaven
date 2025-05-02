<template>
  <div
    class="teacher-card flex-shrink-0 cursor-pointer transition-all hover:shadow-lg mx-2"
    :style="{ width: `calc(${cardWidth} - 1rem)` }"
    @click="handleClick"
  >
    <div class="relative aspect-square rounded-lg overflow-hidden shadow-md">
      <img
        :src="imageUrl"
        :alt="name"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white"
      >
        <h4 class="font-semibold text-lg">{{ name }}</h4>
        <p v-if="description" class="text-sm text-white/90 mt-1">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TeacherCardProps {
  id: number;
  name: string;
  imageUrl: string;
  description?: string;
  cardWidth?: string;
}

const props = withDefaults(defineProps<TeacherCardProps>(), {
  cardWidth: "25%", // Default to showing 4 cards
  description: ""
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click", props.id);
};
</script>
