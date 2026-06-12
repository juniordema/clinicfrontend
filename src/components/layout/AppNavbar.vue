<template>
  <nav class="sticky top-0 z-50 border-b border-warm-200/70 bg-white/95 shadow-[0_1px_16px_rgba(28,27,24,0.06)] backdrop-blur-xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <router-link to="/" class="flex items-center gap-3">
          <img
            :src="logo"
            alt="Angelo Clinic logo"
            class="w-9 h-9 rounded-lg object-contain flex-shrink-0 ring-1 ring-warm-200"
          />
          <span class="font-bold text-warm-900 hidden sm:inline">Angelo Clinic</span>
        </router-link>

        
        <div class="hidden md:flex items-center gap-2">
          <router-link to="/" class="nav-link">{{ $t('nav.home') }}</router-link>
          <router-link :to="{ path: '/', hash: '#services' }" class="nav-link">{{ $t('nav.services') }}</router-link>
          <router-link :to="{ path: '/', hash: '#marketing-hub' }" class="nav-link">{{ $t('nav.newFeatures') }}</router-link>
          <router-link :to="{ path: '/', hash: '#imagerie' }" class="nav-link">{{ $t('nav.imaging') }}</router-link>
          <router-link :to="{ path: '/', hash: '#doctors' }" class="nav-link">{{ $t('nav.doctors') }}</router-link>
          <router-link :to="{ path: '/', hash: '#contact' }" class="nav-link">{{ $t('nav.contact') }}</router-link>

          
          <div class="relative group">
            <button class="nav-link flex items-center gap-1"
              title="Changer la langue">
               {{ languageStore.currentLanguage.toUpperCase() }}
            </button>
            <div class="absolute right-0 mt-0 w-24 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <button
                @click="languageStore.setLanguage('fr')"
                :class="languageStore.isFrench ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'"
                class="w-full text-left px-4 py-2 font-medium transition"
              >
                 Fr
              </button>
              <button
                @click="languageStore.setLanguage('en')"
                :class="languageStore.isEnglish ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'"
                class="w-full text-left px-4 py-2 font-medium transition"
              >
                En
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
            
            <button @click="openAppointmentModal" class="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-sm shadow-primary-900/10 transition">
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
          class="md:hidden p-2 text-warm-600 hover:bg-warm-100 rounded-lg"
        >
          ☰
        </button>
      </div>

      
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-warm-200 py-4 space-y-2">
        <router-link
            :to="{ path: '/', hash: '#services' }"
            @click="selectedNav = 'services'"
            :class="[
    'px-3 py-2 rounded-lg font-medium transition',
    selectedNav === 'services'
      ? 'bg-teal-600 text-white'
      : 'text-warm-700 hover:bg-teal-50 hover:text-teal-600'
  ]"
        >
          {{ $t('nav.services') }}
        </router-link>

        <router-link
            :to="{ path: '/', hash: '#services' }"
            @click="selectedNav = 'services'"
            :class="[
    'px-3 py-2 rounded-lg font-medium transition',
    selectedNav === 'services'
      ? 'bg-teal-600 text-white'
      : 'text-warm-700 hover:bg-teal-50 hover:text-teal-600'
  ]"
        >
          {{ $t('nav.services') }}
        </router-link>

        <router-link
            :to="{ path: '/', hash: '#doctors' }"
            @click="selectedNav = 'doctors'"
            :class="[
    'px-3 py-2 rounded-lg font-medium transition',
    selectedNav === 'doctors'
      ? 'bg-teal-600 text-white'
      : 'text-warm-700 hover:bg-teal-50 hover:text-teal-600'
  ]"
        >
          {{ $t('nav.doctors') }}
        </router-link>        <div class="px-4 py-2 border-t border-gray-200 pt-4">
          <p class="text-xs text-gray-500 font-medium mb-2">{{ $t('nav.language') }}</p>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="languageStore.setLanguage('fr')"
              :class="languageStore.isFrench ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600'"
              class="flex-1 px-3 py-2 rounded font-medium transition text-sm"
            >
               FR
            </button>
            <button
              @click="languageStore.setLanguage('en')"
              :class="languageStore.isEnglish ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600'"
              class="flex-1 px-3 py-2 rounded font-medium transition text-sm"
            >
               EN
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'
import { useLanguageStore } from '@/stores/languageStore'

import NotificationBell from '@/components/notifications/NotificationBell.vue'
import { useActiveSection } from '@/data/useActiveSection'

import logo from '@/assets/images/logo.png'
const selectedNav=ref('home')
const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()
const languageStore = useLanguageStore()

const { t } = useI18n()
const { activeSection } = useActiveSection()

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

.nav-link {
  border-radius: 0.5rem;
  color: #4A473F;
  font-size: 0.925rem;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  background: #F7F5F0;
  color: #0A6B5C;
}

.mobile-nav-link {
  border-radius: 0.5rem;
  color: #4A473F;
  display: block;
  font-weight: 600;
  padding: 0.75rem 1rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.mobile-nav-link:hover {
  background: #F7F5F0;
  color: #0A6B5C;
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
