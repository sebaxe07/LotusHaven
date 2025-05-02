<template>
  <div class="min-h-screen">
    <!-- Header Section -->
    <section class="relative h-[400px] bg-primary-accent">
      <h1 class="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white header1">About Us</h1>
      <NuxtImg
        src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop"
        alt="Yoga meditation space"
        class="w-full h-full object-cover opacity-40"
      />
    </section>

    <!-- Main Content -->
    <section class="bg-secondary py-16">
      <div class="container mx-auto px-4">
        <!-- Introduction Section with Image -->
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <NuxtImg 
              src="/images/whoarewe1.png"
              alt="About Lotus Haven"
              class="rounded-lg shadow-lg w-full"
              format="webp"
              quality="90"
              loading="eager"
            />
          </div>
          <div>
            <h2 class="header2 text-primary-text mb-6">Welcome to Lotus Haven</h2>
            <p class="paragraph text-secondary-text mb-4">
              At Lotus Haven, we believe in creating a space where mind, body, and spirit 
              align in perfect harmony. Our studio is more than just a place for yoga—it's 
              a sanctuary where you can disconnect from the outside world and reconnect 
              with yourself.
            </p>
            <p class="paragraph text-secondary-text">
              Founded with a vision of making yoga accessible to everyone, we've cultivated 
              a community that celebrates growth, mindfulness, and personal transformation.
            </p>
          </div>
        </div>

        <!-- Decorative Divider -->
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

        <!-- Info Cards Grid -->
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Location Card -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-8">
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

          <!-- Hours Card -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-8">
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
            <div class="mt-6 p-4 bg-third-accent/40 rounded-lg">
              <p class="paragraph text-secondary-text">
                Classes are scheduled throughout the day. Check our activities page for 
                specific class times and availability.
              </p>
            </div>
          </div>

          <!-- Contact Card -->
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
            <p class="paragraph mb-8 text-white/90">Have questions or want to connect with us? Visit our contact page to reach out to our team.</p>
            <UiButton
              text="Contact Us"
              color="white"
              size="lg"
              @click="$router.push('/contact')"
            />
          </div>
        </div>

        <!-- Map Section -->
        <div class="mt-12 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.9!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40.7,-73.9!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="450"
            style="border:0;"
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
// Component logic can be added here if needed
</script>
