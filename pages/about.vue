<template>
  <div class="min-h-screen">
    <!-- Hero Banner - Visual header with overlaid title on semi-transparent background -->
    <section class="relative h-[400px] bg-primary-accent">
      <h1
        class="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white header1"
      >
        About Us
      </h1>
      <NuxtImg
        src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop"
        alt="Yoga meditation space"
        class="w-full h-full object-cover opacity-40"
      />
    </section>

    <!-- Main Content Container - Light background for readability -->
    <section class="bg-secondary py-16">
      <div class="container mx-auto px-4">
        <!-- Philosophy Section - Two-column layout with decorative illustration and mission statement -->
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <UiDecorativeIllustration />
          </div>
          <div>
            <h2 class="header2 text-primary-text mb-6">Our Philosophy</h2>
            <p class="paragraph text-secondary-text mb-4">
              Since our founding, we've witnessed countless transformations as
              students discover their inner strength and peace through our
              holistic approach to wellness. Our experienced instructors draw
              from diverse yogic traditions, creating an environment where
              ancient wisdom meets modern practice.
            </p>
            <p class="paragraph text-secondary-text">
              We believe that true wellness emerges from understanding and
              nurturing the connection between physical practice, mindful
              breathing, and spiritual growth. Through our carefully crafted
              programs and supportive community, we help you develop not just
              flexibility and strength, but also mental clarity and emotional
              balance.
            </p>
          </div>
        </div>

        <!-- Visual Section Divider - Horizontal rule with centered icon and text -->
        <div class="flex items-center my-16">
          <div class="flex-1 border-t border-primary-accent/30"></div>
          <div class="mx-4 flex items-center gap-3">
            <UiSvgIcon
              icon="/icons/location.svg"
              :width="24"
              :height="24"
              color="var(--color-primary-accent)"
            />
            <span class="text-primary-accent font-medium">Visit Us</span>
          </div>
          <div class="flex-1 border-t border-primary-accent/30"></div>
        </div>

        <!-- Information Cards - Three-column grid with studio details -->
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Location Card - Physical address information with icon -->
          <div
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-8"
          >
            <div class="flex items-center gap-3 mb-6">
              <UiSvgIcon
                icon="/icons/location.svg"
                :width="24"
                :height="24"
                color="var(--color-primary-accent)"
              />
              <h3 class="header3 text-primary-text">Location</h3>
            </div>
            <div class="space-y-2 text-secondary-text">
              <p class="paragraph">123 Serenity Street</p>
              <p class="paragraph">Mindful Valley, MW 12345</p>
              <p class="paragraph">United States</p>
            </div>
          </div>

          <!-- Operating Hours Card - Schedule information with additional note -->
          <div
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-8"
          >
            <div class="flex items-center gap-3 mb-6">
              <UiSvgIcon
                icon="/icons/clock.svg"
                :width="24"
                :height="24"
                color="var(--color-primary-accent)"
              />
              <h3 class="header3 text-primary-text">Studio Hours</h3>
            </div>
            <div class="space-y-2 text-secondary-text">
              <p class="paragraph">Monday - Friday: 6:00 AM - 9:00 PM</p>
              <p class="paragraph">Saturday: 8:00 AM - 6:00 PM</p>
              <p class="paragraph">Sunday: 9:00 AM - 4:00 PM</p>
            </div>
            <!-- Special Notice - Highlighted information about class scheduling -->
            <div class="mt-6 p-4 bg-third-accent/40 rounded-lg">
              <p class="paragraph text-secondary-text">
                Classes are scheduled throughout the day. Check our activities
                page for specific class times and availability.
              </p>
            </div>
          </div>

          <!-- Contact Card - CTA with button linking to contact page -->
          <div class="bg-primary-accent rounded-lg shadow-md p-8 text-white">
            <div class="flex items-center gap-3 mb-6">
              <UiSvgIcon
                icon="/icons/contact.svg"
                :width="24"
                :height="24"
                color="white"
              />
              <h3 class="header3">Get in Touch</h3>
            </div>
            <p class="paragraph mb-8 text-white/90">
              Have questions or want to connect with us? Visit our contact page
              to reach out to our team.
            </p>
            <!-- Navigation Button - Routes to contact page -->
            <UiButton
              text="Contact Us"
              color="white"
              size="lg"
              @click="$router.push('/contact')"
            />
          </div>
        </div>

        <!-- Location Map - Embedded Google Maps with studio location -->
        <div class="mt-12 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.9!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40.7,-73.9!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="450"
            style="border: 0"
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="w-full"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "nuxt/app";

// Configure SEO metadata for about page with proper titles and studio information
useHead({
  title: "About Us | Our Studio & Philosophy | Lotus Haven",
  meta: [
    {
      name: "description",
      content:
        "Learn about Lotus Haven yoga studio, our philosophy, location, and mission. Discover how we integrate ancient wisdom with modern practice to create a nurturing wellness environment.",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    // Open Graph tags for better social media sharing
    { property: "og:title", content: "About Lotus Haven Yoga Studio" },
    {
      property: "og:description",
      content:
        "Learn about our yoga philosophy, studio location and hours at Lotus Haven.",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>
