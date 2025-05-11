<template>
  <div class="min-h-screen bg-secondary">
    <!-- Hero Banner - Visual header with title overlay on background image -->
    <section class="relative h-[400px] bg-primary-accent">
      <h1
        class="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white"
      >
        Contact Us
      </h1>
      <NuxtImg
        src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=2070&auto=format&fit=crop"
        alt="Yoga contact header"
        class="w-full h-full object-cover opacity-40"
      />
    </section>

    <!-- Main Content - Two-column layout with contact cards and form -->
    <section class="container mx-auto px-4 py-16">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Staff Directory - Contact cards for key personnel -->
        <div class="space-y-6">
          <div class="grid gap-6">
            <!-- Contact Person Cards - Dynamic list of staff members -->
            <UiContactCard
              v-for="person in contactPeople"
              :key="person.name"
              :name="person.name"
              :role="person.role"
              :description="person.description"
              :image-url="person.imageUrl"
            />
          </div>
        </div>

        <!-- Inquiry Form - User input fields for message submission -->
        <div class="bg-primary-accent rounded-lg p-8 shadow-md text-white">
          <h2 class="text-2xl font-semibold mb-6">Get In Touch</h2>
          <!-- Contact Form - User input with validation and submission handling -->
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- Full Name Field - Required text input -->
            <div>
              <label for="fullName" class="block text-sm font-medium mb-2"
                >Full Name</label
              >
              <input
                id="fullName"
                v-model="formData.fullName"
                type="text"
                class="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            <!-- Email Field - Required email input with validation -->
            <div>
              <label for="email" class="block text-sm font-medium mb-2"
                >Email Address</label
              >
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            <!-- Message Field - Multiline text area for inquiry details -->
            <div>
              <label for="message" class="block text-sm font-medium mb-2"
                >Message</label
              >
              <textarea
                id="message"
                v-model="formData.message"
                rows="5"
                class="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                required
              ></textarea>
            </div>

            <!-- Submit Button - Triggers form submission handler -->
            <UiButton
              text="Send Message"
              color="white"
              type="submit"
              size="lg"
              full-width
            />
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "nuxt/app";

// Configure SEO metadata for contact page with proper titles and descriptions
useHead({
  title: "Contact Us | Yoga Studio | Lotus Haven",
  meta: [
    {
      name: "description",
      content:
        "Get in touch with our team at Lotus Haven yoga studio. Contact our instructors and staff for inquiries about classes, memberships, or partnerships.",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    // Open Graph tags for better social media sharing
    { property: "og:title", content: "Contact Lotus Haven Yoga Studio" },
    {
      property: "og:description",
      content:
        "Contact our team for questions about classes, memberships, or partnerships at Lotus Haven yoga studio.",
    },
    { property: "og:type", content: "website" },
  ],
});

// Staff directory data with contact information and roles
// Each entry includes name, role, description and profile image
const contactPeople = ref([
  {
    name: "Daniel Ruiz",
    role: "Studio Director",
    description: "Available for administrative inquiries and partnerships",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Giacomo Scampini",
    role: "Lead Instructor",
    description: "Contact for private sessions and teacher training",
    imageUrl:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Zeynep Erbaysal",
    role: "Client Relations Manager",
    description: "Here to help with membership and class scheduling",
    imageUrl:
      "https://images.unsplash.com/photo-1529693662653-9d480530a697?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Sebastian Perea",
    role: "Client Relations Manager",
    description: "Here to help with membership and class scheduling",
    imageUrl:
      "https://images.unsplash.com/photo-1529693662653-9d480530a697?q=80&w=500&auto=format&fit=crop",
  },
]);

// Form state for contact inquiries
// Tracks user input for name, email, and message content
const formData = ref({
  fullName: "",
  email: "",
  message: "",
});

// Handle form submission event
// Currently logs data to console, will be connected to backend service
const handleSubmit = () => {
  // TODO: Implement form submission to backend service
  console.log("Form submitted:", formData.value);
};
</script>
