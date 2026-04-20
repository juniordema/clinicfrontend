<template>
  <div class="relative">
    <!-- Bell Button -->
    <button
      @click="toggleNotifications"
      class="relative p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition"
      :title="$t('notifications.title')"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        ></path>
      </svg>
      <!-- Badge avec nombre de notifications -->
      <span
        v-if="unreadCount > 0"
        class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
      >
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <!-- Notification Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="showNotifications"
        class="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-hidden flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 class="font-semibold text-gray-900">Notifications</h3>
          <button
            @click="showNotifications = false"
            class="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <!-- Notifications List -->
        <div class="overflow-y-auto flex-1">
          <div v-if="loading" class="px-4 py-8 text-center">
            <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
          </div>

          <div v-else-if="notifications.length === 0" class="px-4 py-8 text-center text-gray-500">
            {{ $t('notifications.empty') }}
          </div>

          <div v-else class="divide-y divide-gray-200">
            <div
              v-for="notification in notifications"
              :key="notification.id"
              :class="[
                'px-4 py-3 hover:bg-gray-50 transition cursor-pointer',
                { 'bg-teal-50': !notification.isRead }
              ]"
            >
              <!-- Notification Content -->
              <div @click="handleMarkAsRead(notification)" class="space-y-1">
                <div class="flex items-start justify-between gap-2">
                  <h4 class="font-semibold text-gray-900 text-sm">{{ notification.title }}</h4>
                  <div v-if="!notification.isRead" class="flex-shrink-0 w-2 h-2 rounded-full bg-teal-600"></div>
                </div>
                <p class="text-sm text-gray-600 line-clamp-2">{{ notification.message }}</p>
                <div v-if="notification.data" class="text-xs text-gray-500 mt-2 space-y-1">
                  <p v-if="notification.data.patientName">
                    <strong>{{ $t('notifications.patient') }}:</strong> {{ notification.data.patientName }}
                  </p>
                  <p v-if="notification.data.date && notification.data.time">
                    <strong>{{ $t('notifications.appointment') }}:</strong> {{ formatDate(notification.data.date) }} {{ $t('common.at') }} {{ notification.data.time }}
                  </p>
                  <p v-if="notification.data.serviceName">
                    <strong>{{ $t('notifications.type') }}:</strong> {{ notification.data.serviceName }}
                  </p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                <button
                  @click.stop="handleMarkAsRead(notification)"
                  :class="[
                    'text-xs px-2 py-1 rounded transition',
                    notification.isRead
                      ? 'text-gray-400 bg-gray-100'
                      : 'text-teal-600 bg-teal-50 hover:bg-teal-100'
                  ]"
                >
                  {{ notification.isRead ? $t('notifications.read') : $t('notifications.markAsRead') }}
                </button>
                <button
                  @click.stop="handleDelete(notification.id)"
                  class="text-xs px-2 py-1 text-red-600 bg-red-50 hover:bg-red-100 rounded transition"
                >
                  {{ $t('buttons.delete') }}
                </button>
              </div>

              <!-- Timestamp -->
              <div class="text-xs text-gray-400 mt-2">
                {{ formatTime(notification.createdAt) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="notifications.length > 0" class="px-4 py-2 border-t border-gray-200 bg-gray-50">
          <button
            @click="markAllAsRead"
            class="w-full text-xs text-teal-600 hover:text-teal-700 font-medium"
          >
            {{ $t('notifications.markAllAsRead') }}
          </button>
        </div>
      </div>
    </transition>

    <!-- Overlay pour fermer -->
    <div
      v-if="showNotifications"
      @click="showNotifications = false"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNotificationStore } from '@/stores/notificationStore'

const notificationStore = useNotificationStore()
const { locale, t } = useI18n()

const showNotifications = ref(false)
const loading = ref(false)
let pollInterval = null

const notifications = computed(() => notificationStore.notifications)
const unreadCount = computed(() => notificationStore.unreadCount)

async function toggleNotifications() {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value) {
    await loadNotifications()
    startPolling()
  } else {
    stopPolling()
  }
}

async function loadNotifications() {
  loading.value = true
  try {
    await notificationStore.fetchNotifications()
    await notificationStore.fetchUnreadCount()
  } catch (err) {
    console.error('Error loading notifications:', err)
  } finally {
    loading.value = false
  }
}

function startPolling() {
  // Polling toutes les 30 secondes
  pollInterval = setInterval(loadNotifications, 30000)
}

function stopPolling() {
  if (pollInterval) {
    clearInterval(pollInterval)
    pollInterval = null
  }
}

async function handleMarkAsRead(notification) {
  if (!notification.isRead) {
    await notificationStore.markAsRead(notification.id)
  }
}

async function handleDelete(notificationId) {
  await notificationStore.deleteNotification(notificationId)
  await loadNotifications()
}

async function markAllAsRead() {
  const unreadNotifications = notifications.value.filter(n => !n.isRead)
  for (const notif of unreadNotifications) {
    await notificationStore.markAsRead(notif.id)
  }
  await loadNotifications()
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale.value === 'en' ? 'en-GB' : 'fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatTime(createdAt) {
  const date = new Date(createdAt)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return t('notifications.justNow')
  if (diffMins < 60) return t('notifications.minutesAgo', { count: diffMins })
  if (diffHours < 24) return t('notifications.hoursAgo', { count: diffHours })
  if (diffDays < 7) return t('notifications.daysAgo', { count: diffDays })
  
  return date.toLocaleDateString(locale.value === 'en' ? 'en-GB' : 'fr-FR')
}

onMounted(() => {
  loadNotifications()
})

onUnmounted(() => {
  stopPolling()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
