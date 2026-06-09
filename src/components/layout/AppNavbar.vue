<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <router-link to="/" class="flex items-center gap-2">
          <img
            :src="logo"
            alt="Angelo Clinic logo"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain flex-shrink-0"
          />
          <span class="font-bold text-gray-800 hidden sm:inline">Angelo Clinic</span>
        </router-link>

        
        <div class="hidden md:flex items-center gap-6">
          <router-link to="/" class="text-gray-600 hover:text-gray-900 font-medium">{{ $t('nav.home') }}</router-link>
          <a href="/#services" class="text-gray-600 hover:text-gray-900 font-medium">{{ $t('nav.services') }}</a>
          <a href="/#imagerie" class="text-gray-600 hover:text-gray-900 font-medium">{{ $t('nav.imaging') }}</a>
          <a href="/#doctors" class="text-gray-600 hover:text-gray-900 font-medium">{{ $t('nav.doctors') }}</a>
          <a href="/#contact" class="text-gray-600 hover:text-gray-900 font-medium">{{ $t('nav.contact') }}</a>

          
          <div class="relative group">
            <button class="px-3 py-2 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
              title="Changer la langue">
              🌐 {{ languageStore.currentLanguage.toUpperCase() }}
            </button>
            <div class="absolute right-0 mt-0 w-24 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <button
                @click="languageStore.setLanguage('fr')"
                :class="languageStore.isFrench ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'"
                class="w-full text-left px-4 py-2 font-medium transition"
              >
                🇫🇷 Français
              </button>
              <button
                @click="languageStore.setLanguage('en')"
                :class="languageStore.isEnglish ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'"
                class="w-full text-left px-4 py-2 font-medium transition"
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          <template v-if="isAuthenticated">
            <NotificationBell />
          </template>

          
          <template v-if="isDoctor">

            
            <button
              @click="handleLogout"
              class="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition"
            >
              {{ $t('nav.logout') }}
            </button>

            
            <button
              @click="switchAccount"
              class="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition"
              :title="$t('nav.otherAccount')"
            >
              {{ $t('nav.otherAccount') }}
            </button>
          </template>

          
          <template v-else>
            
            <button @click="openAppointmentModal" class="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium transition">
              {{ $t('nav.appointment') }}
            </button>

            
            <template v-if="isAuthenticated">
              <div class="flex items-center gap-3">
                <router-link
                  to="/dashboard"
                  class="text-gray-600 hover:text-teal-600 font-medium flex items-center gap-2 transition"
                >
                  👤 {{ user?.firstName }}
                </router-link>
                
                
                <div class="relative group">
                  <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                    title="Paramètres du compte">
                    ⚙️
                  </button>
                  <div class="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <router-link to="/dashboard" class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-teal-600 block">
                      {{ $t('nav.dashboard') }}
                    </router-link>
                    <button
                      @click="handleLogout"
                      class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      {{ $t('nav.logout') }}
                    </button>
                  </div>
                </div>
              </div>
            </template>

            
            <button
              @click="isAuthenticated ? switchAccount() : openLoginModal()"
              :class="isAuthenticated 
                ? 'bg-blue-100 hover:bg-blue-200 text-blue-700' 
                : 'bg-teal-600 hover:bg-teal-700 text-white'"
              class="px-4 py-2 rounded-lg font-medium transition"
              :title="isAuthenticated ? $t('nav.otherAccount') : $t('nav.login')"
            >
              {{ isAuthenticated ? $t('nav.otherAccount') : $t('nav.login') }}
            </button>
          </template>
        </div>

        
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded"
        >
          ☰
        </button>
      </div>

      
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 py-4 space-y-4">
        <router-link @click="mobileMenuOpen = false" to="/" class="block text-gray-600 hover:text-gray-900 font-medium">{{ $t('nav.home') }}</router-link>
        <a @click="mobileMenuOpen = false" href="/#services" class="block text-gray-600 hover:text-gray-900 font-medium">{{ $t('nav.services') }}</a>
        <a @click="mobileMenuOpen = false" href="/#imagerie" class="block text-gray-600 hover:text-gray-900 font-medium">{{ $t('nav.imaging') }}</a>
        <a @click="mobileMenuOpen = false" href="/#doctors" class="block text-gray-600 hover:text-gray-900 font-medium">{{ $t('nav.doctors') }}</a>
        <a @click="mobileMenuOpen = false" href="/#contact" class="block text-gray-600 hover:text-gray-900 font-medium">{{ $t('nav.contact') }}</a>

        <div class="px-4 py-2 border-t border-gray-200 pt-4">
          <p class="text-xs text-gray-500 font-medium mb-2">{{ $t('nav.language') }}</p>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="languageStore.setLanguage('fr')"
              :class="languageStore.isFrench ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600'"
              class="flex-1 px-3 py-2 rounded font-medium transition text-sm"
            >
              🇫🇷 FR
            </button>
            <button
              @click="languageStore.setLanguage('en')"
              :class="languageStore.isEnglish ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600'"
              class="flex-1 px-3 py-2 rounded font-medium transition text-sm"
            >
              🇬🇧 EN
            </button>
          </div>
        </div>

        
        <template v-if="isDoctor">
          <div class="px-4">
            <NotificationBell />
          </div>
          
          <button
            @click="handleLogout"
            class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded"
          >
            {{ $t('nav.logout') }}
          </button>
          
          <button
            @click="switchAccount"
            class="w-full text-left px-4 py-2 text-blue-700 hover:bg-blue-50 rounded font-medium"
          >
            {{ $t('nav.otherAccount') }}
          </button>
        </template>

        
        <template v-else>
          <div v-if="isAuthenticated" class="px-4">
            <NotificationBell />
          </div>
          <button 
            @click="openAppointmentModal"
            class="w-full px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium transition">
            {{ $t('nav.appointment') }}
          </button>

          
          <template v-if="isAuthenticated">
            <router-link
              to="/dashboard"
              @click="mobileMenuOpen = false"
              class="block px-4 py-2 text-gray-600 hover:text-teal-600 font-medium border-b border-gray-100"
            >
              👤 {{ user?.firstName }}
            </router-link>
            <router-link to="/dashboard" class="block text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
              {{ $t('nav.dashboard') }}
            </router-link>
            <button
              @click="handleLogout"
              class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded font-medium"
            >
              {{ $t('nav.logout') }}
            </button>
            <button
              @click="switchAccount"
              class="w-full text-left px-4 py-2 text-blue-700 hover:bg-blue-50 rounded font-medium"
            >
              {{ $t('nav.otherAccount') }}
            </button>
          </template>

          
          <button
            @click="isAuthenticated ? switchAccount() : openLoginModal()"
            :class="isAuthenticated 
              ? 'bg-blue-100 hover:bg-blue-200 text-blue-700' 
              : 'bg-teal-600 hover:bg-teal-700 text-white'"
            class="w-full px-4 py-2 rounded-lg font-medium transition"
          >
            {{ isAuthenticated ? $t('nav.otherAccount') : $t('nav.login') }}
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'
import { useLanguageStore } from '@/stores/languageStore'
import NotificationBell from '@/components/notifications/NotificationBell.vue'
import logo from '@/assets/images/logo.png'

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()
const languageStore = useLanguageStore()
const { t } = useI18n()

const mobileMenuOpen = ref(false)

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
const isDoctor = computed(() => authStore.isDoctor)

function openLoginModal() {
  window.appModals?.openLogin()
}

function openAppointmentModal() {
  window.appModals?.openAppointment()
}

function handleLogout() {
  authStore.logout()
  toastStore.success(t('messages.logout'))
  router.push('/')
  mobileMenuOpen.value = false
}

function switchAccount() {
  authStore.logout()
  toastStore.info(t('messages.switchAccount'))
  mobileMenuOpen.value = false
  window.appModals?.openLogin()
}
</script>

<style scoped>
nav {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
