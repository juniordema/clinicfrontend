<template>
  <nav class="sticky top-0 z-50 border-b border-warm-200/70 bg-white/90 shadow-[0_1px_20px_rgba(28,27,24,0.06)] backdrop-blur-xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-4">
        <router-link to="/" class="group flex min-w-0 items-center gap-3" @click="closeMobileMenu(); activateNav('home')">
          <img
            :src="logo"
            alt="Angelo Clinic logo"
            class="h-10 w-10 flex-shrink-0 rounded-lg object-contain ring-1 ring-warm-200 transition-transform duration-300 group-hover:scale-105"
          />
          <span class="hidden truncate font-bold text-warm-900 sm:inline">Clinique Angelo</span>
        </router-link>

        <div class="hidden lg:flex items-center gap-1">
          <router-link
            v-for="item in navItems"
            :key="item.id"
            :to="item.to"
            class="nav-link"
            :class="{ 'nav-link-active': isActiveNav(item.id) }"
            @click="activateNav(item.id)"
          >
            {{ $t(item.labelKey) }}
          </router-link>
        </div>

        <div class="hidden lg:flex items-center gap-2">
          <div class="relative group">
            <button class="nav-action min-w-14" title="Changer la langue">
              <i class="fas fa-globe text-xs"></i>
              {{ languageStore.currentLanguage.toUpperCase() }}
            </button>
            <div class="nav-menu invisible absolute right-0 top-full mt-2 w-28 opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <button
                @click="languageStore.setLanguage('fr')"
                :class="languageStore.isFrench ? 'bg-primary-50 text-primary-700' : 'text-warm-600 hover:bg-warm-50'"
                class="w-full rounded-md px-3 py-2 text-left text-sm font-semibold transition-colors"
              >
                FR
              </button>
              <button
                @click="languageStore.setLanguage('en')"
                :class="languageStore.isEnglish ? 'bg-primary-50 text-primary-700' : 'text-warm-600 hover:bg-warm-50'"
                class="w-full rounded-md px-3 py-2 text-left text-sm font-semibold transition-colors"
              >
                EN
              </button>
            </div>
          </div>

          <NotificationBell v-if="isAuthenticated" />

          <template v-if="isDoctor">
            <button @click="handleLogout" class="nav-action text-red-600 hover:bg-red-50 hover:text-red-700">
              <i class="fas fa-arrow-right-from-bracket text-xs"></i>
              {{ $t('nav.logout') }}
            </button>
            <button @click="switchAccount" class="nav-action bg-blue-50 text-blue-700 hover:bg-blue-100">
              {{ $t('nav.otherAccount') }}
            </button>
          </template>

          <template v-else>
            <button @click="openAppointmentModal" class="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold">
              <i class="fas fa-calendar-check text-xs"></i>
              {{ $t('nav.appointment') }}
            </button>

            <router-link
              v-if="isAuthenticated"
              to="/dashboard"
              class="nav-action"
            >
              <i class="fas fa-user text-xs"></i>
              <span class="max-w-24 truncate">{{ user?.firstName }}</span>
            </router-link>

            <button
              @click="isAuthenticated ? switchAccount() : openLoginModal()"
              class="nav-action"
              :class="isAuthenticated ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'bg-primary-50 text-primary-700 hover:bg-primary-100'"
            >
              {{ isAuthenticated ? $t('nav.otherAccount') : $t('nav.login') }}
            </button>
          </template>
        </div>

        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-warm-700 transition-colors hover:bg-warm-100"
          :aria-expanded="mobileMenuOpen"
          aria-label="Ouvrir le menu"
        >
          <i class="fas" :class="mobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
      </div>

      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="lg:hidden border-t border-warm-200/80 py-4">
          <div class="grid gap-1">
            <router-link
              v-for="item in navItems"
              :key="item.id"
              :to="item.to"
              class="mobile-nav-link"
              :class="{ 'mobile-nav-link-active': isActiveNav(item.id) }"
              @click="closeMobileMenu(); activateNav(item.id)"
            >
              {{ $t(item.labelKey) }}
            </router-link>
          </div>

          <div class="mt-4 grid grid-cols-2 gap-2 border-t border-warm-200/70 pt-4">
            <button
              @click="languageStore.setLanguage('fr')"
              :class="languageStore.isFrench ? 'bg-primary-500 text-white' : 'bg-warm-100 text-warm-700'"
              class="rounded-lg px-3 py-2 text-sm font-semibold transition-colors"
            >
              FR
            </button>
            <button
              @click="languageStore.setLanguage('en')"
              :class="languageStore.isEnglish ? 'bg-primary-500 text-white' : 'bg-warm-100 text-warm-700'"
              class="rounded-lg px-3 py-2 text-sm font-semibold transition-colors"
            >
              EN
            </button>
          </div>

          <div v-if="isAuthenticated" class="mt-4 flex items-center justify-between gap-3 rounded-lg bg-warm-50 p-3">
            <router-link to="/dashboard" class="min-w-0 text-sm font-semibold text-warm-800" @click="closeMobileMenu">
              <i class="fas fa-user mr-2 text-primary-600"></i>
              <span class="truncate">{{ user?.firstName || $t('nav.dashboard') }}</span>
            </router-link>
            <NotificationBell />
          </div>

          <div class="mt-4 grid gap-2">
            <button
              v-if="!isDoctor"
              @click="openAppointmentModal"
              class="btn-primary flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold"
            >
              <i class="fas fa-calendar-check text-xs"></i>
              {{ $t('nav.appointment') }}
            </button>

            <router-link
              v-if="isAuthenticated"
              to="/dashboard"
              class="mobile-action"
              @click="closeMobileMenu"
            >
              {{ $t('nav.dashboard') }}
            </router-link>

            <button
              v-if="isDoctor || isAuthenticated"
              @click="handleLogout"
              class="mobile-action text-red-600 hover:bg-red-50"
            >
              {{ $t('nav.logout') }}
            </button>

            <button
              @click="isAuthenticated ? switchAccount() : openLoginModal()"
              class="mobile-action"
            >
              {{ isAuthenticated ? $t('nav.otherAccount') : $t('nav.login') }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'
import { useLanguageStore } from '@/stores/languageStore'

import NotificationBell from '@/components/notifications/NotificationBell.vue'
import { useActiveSection } from '@/data/useActiveSection'

import logo from '@/assets/images/logo.png'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const toastStore = useToastStore()
const languageStore = useLanguageStore()

const { t } = useI18n()
const { activeSection } = useActiveSection()

const mobileMenuOpen = ref(false)
const selectedNav = ref('home')
const navItems = [
  { id: 'home', labelKey: 'nav.home', to: '/' },
  { id: 'services', labelKey: 'nav.services', to: { path: '/', hash: '#services' } },
  { id: 'marketing-hub', labelKey: 'nav.newFeatures', to: { path: '/', hash: '#marketing-hub' } },
  { id: 'imagerie', labelKey: 'nav.imaging', to: { path: '/', hash: '#imagerie' } },
  { id: 'doctors', labelKey: 'nav.doctors', to: { path: '/', hash: '#doctors' } },
  { id: 'contact', labelKey: 'nav.contact', to: { path: '/', hash: '#contact' } }
]

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
const isDoctor = computed(() => authStore.isDoctor)

onMounted(() => {
  syncNavFromRoute()
})

watch(activeSection, (sectionId) => {
  if (sectionId) selectedNav.value = sectionId
})

watch(
  () => route.hash,
  () => {
    syncNavFromRoute()
  }
)

function openLoginModal() {
  mobileMenuOpen.value = false
  window.appModals?.openLogin()
}

function openAppointmentModal() {
  mobileMenuOpen.value = false
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

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function isActiveNav(sectionId: string) {
  return selectedNav.value === sectionId
}

function syncNavFromRoute() {
  const hash = route.hash.replace('#', '')
  if (hash) {
    const match = navItems.find((item) => item.id === hash)
    if (match) {
      selectedNav.value = match.id
      return
    }
  }

  if (route.path === '/') {
    selectedNav.value = activeSection.value || 'home'
  }
}

function activateNav(sectionId: string) {
  selectedNav.value = sectionId
}
</script>
<style scoped>
nav {
  animation: slideDown 0.36s var(--ease-fluid);
}

.nav-link {
  align-items: center;
  border-radius: 0.5rem;
  color: #4A473F;
  display: inline-flex;
  font-size: 0.925rem;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  position: relative;
  transition: background-color 0.24s var(--ease-fluid), color 0.24s var(--ease-fluid), transform 0.24s var(--ease-fluid);
  white-space: nowrap;
}

.nav-link:hover {
  background: #F7F5F0;
  color: #0A6B5C;
  transform: translateY(-1px);
}

.nav-link-active {
  background: #E8F5F1;
  color: #0A6B5C;
  box-shadow: inset 0 0 0 1px rgba(10, 107, 92, 0.08);
}

.nav-action {
  align-items: center;
  border-radius: 0.5rem;
  color: #4A473F;
  display: inline-flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  min-height: 2.5rem;
  padding: 0.5rem 0.8rem;
  transition: background-color 0.24s var(--ease-fluid), color 0.24s var(--ease-fluid), transform 0.24s var(--ease-fluid);
}

.nav-action:hover {
  background: #F7F5F0;
  color: #0A6B5C;
  transform: translateY(-1px);
}

.nav-menu {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(216, 211, 202, 0.72);
  border-radius: 0.5rem;
  box-shadow: 0 18px 46px rgba(28, 27, 24, 0.12);
  padding: 0.35rem;
  transition: opacity 0.18s ease, visibility 0.18s ease;
}

.mobile-nav-link {
  align-items: center;
  border-radius: 0.5rem;
  color: #4A473F;
  display: flex;
  font-weight: 600;
  padding: 0.75rem 1rem;
  transition: background-color 0.24s var(--ease-fluid), color 0.24s var(--ease-fluid), transform 0.24s var(--ease-fluid);
}

.mobile-nav-link:hover {
  background: #F7F5F0;
  color: #0A6B5C;
}

.mobile-nav-link-active {
  background: #E8F5F1;
  color: #0A6B5C;
}

.mobile-action {
  border-radius: 0.5rem;
  color: #4A473F;
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 0.75rem 1rem;
  text-align: left;
  transition: background-color 0.24s var(--ease-fluid), color 0.24s var(--ease-fluid);
}

.mobile-action:hover {
  background: #F7F5F0;
  color: #0A6B5C;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.24s var(--ease-fluid), transform 0.24s var(--ease-fluid), max-height 0.28s var(--ease-fluid);
  overflow: hidden;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-8px);
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  max-height: 620px;
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
