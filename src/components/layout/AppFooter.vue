<template>
  <footer class="bg-warm-900 text-warm-400 py-14 border-t border-warm-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <div class="lg:pr-4">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-9 h-9 rounded-lg bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-900/20">
              <i class="fas fa-heartbeat text-white"></i>
            </div>
            <span class="font-display font-bold text-lg text-white">Clinic Angelo</span>
          </div>
          <p class="text-sm leading-relaxed max-w-xs">{{ $t('footer.description') }}</p>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-4">{{ $t('footer.quickLinks') }}</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/#about" class="hover:text-accent-400 transition-colors">{{ $t('sections.about') }}</router-link></li>
            <li><router-link to="/#services" class="hover:text-accent-400 transition-colors">{{ $t('nav.services') }}</router-link></li>
            <li><router-link to="/#doctors" class="hover:text-accent-400 transition-colors">{{ $t('nav.doctors') }}</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-4">{{ $t('nav.services') }}</h4>
          <ul class="space-y-2 text-sm">
            <li v-for="s in localizedServices.slice(0,5)" :key="s.name" class="text-warm-300">{{ s.displayName }}</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-4">{{ $t('footer.followUs') }}</h4>
          <div class="flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-warm-800 hover:bg-primary-500 flex items-center justify-center transition-colors border border-warm-700"
              :aria-label="social.label"
            >
              <i :class="social.icon" class="text-sm"></i>
            </a>
          </div>
          <div class="mt-4">
            <a
              href="https://wa.me/237699887766"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              <i class="fab fa-whatsapp text-lg"></i>
            </a>
          </div>
        </div>
      </div>
      <hr class="border-warm-800 mb-6">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
        <p>{{ $t('footer.copyright') }}</p>
        <p>{{ $t('footer.location') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { services } from '@/data/services'

const { locale } = useI18n()
const localizedServices = computed(() =>
  services.map((service) => ({
    ...service,
    displayName: locale.value === 'en' ? service.nameEn || service.name : service.name
  }))
)

const socialLinks = [
  {
    label: 'Facebook',
    icon: 'fab fa-facebook-f',
    url: 'https://www.facebook.com/medicaldouala'
  },
  {
    label: 'Twitter / X',
    icon: 'fab fa-twitter',
    url: 'https://twitter.com/medical'
  },
  {
    label: 'Instagram',
    icon: 'fab fa-instagram',
    url: 'https://www.instagram.com/medicaldouala'
  },
  {
    label: 'LinkedIn',
    icon: 'fab fa-linkedin-in',
    url: 'https://www.linkedin.com/company/medicaldouala'
  }
]
</script>
