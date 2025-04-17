<template>
  <div>
    <h1 class="text-3xl font-bold bg-primary mb-6">Welcome to Lotus Haven</h1>
    <p class="">Your sanctuary for peace, wellness and mindfulness.</p>
    <p class="header1">Lorem Ipsum</p>
    <p class="header2">Lorem Ipsum</p>
    <p class="header3">Lorem Ipsum</p>
    <p class="paragraph">Lorem Ipsum</p>

    <h1>Lorem Ipsum</h1>
    <h2>Lorem Ipsum</h2>
    <h3>Lorem Ipsum</h3>
    <p>Lorem Ipsum</p>

    <nuxt-img src="/images/logo.svg" alt="Logo" width="200" height="200" />
    <ul class="list-disc pl-5">
      <li v-for="todo in todos" :key="todo.id">{{ todo.id }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const supabase = useSupabaseClient();

const todos = ref<{ id: number; name: string }[]>(
  [] as { id: number; name: string }[]
);

async function getTodos() {
  const { data } = await supabase.from("todos").select();
  console.log("Todos:", data);
  todos.value = data ?? [];
}

onMounted(() => {
  getTodos();
});
</script>
