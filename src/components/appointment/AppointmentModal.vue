<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-[300] flex items-end sm:items-center justify-center">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeAppointment"></div>

        <!-- Sheet mobile / Modal desktop -->
        <div class="relative bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh]">

          <!-- Handle mobile -->
          <div class="flex justify-center pt-3 pb-1 sm:hidden">
            <div class="w-10 h-1 rounded-full bg-gray-200"></div>
          </div>

          <!-- Header sticky -->
          <div class="px-5 pt-2 pb-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
            <div class="flex items-center justify-between mb-3">
              <div>
                <h2 class="font-bold text-lg text-gray-900">{{ $t('appointment.title') }}</h2>
                <p class="text-xs text-gray-400 mt-0.5">{{ $t('appointment.stepCounter', { current: step, total: totalSteps }) }}</p>
              </div>
              <button @click="closeAppointment" class="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 active:scale-95 transition-transform">
                <i class="fas fa-times text-sm"></i>
              </button>
            </div>

            <!-- Barre de progression -->
            <div class="flex gap-1.5">
              <div v-for="s in totalSteps" :key="s"
                class="h-1 rounded-full flex-1 transition-all duration-300"
                :class="s <= step ? 'bg-emerald-500' : 'bg-gray-100'">
              </div>
            </div>

            <!-- Labels étapes -->
            <div class="flex justify-between mt-1.5 px-0.5">
              <span v-for="(label, i) in stepLabels" :key="i"
                class="text-[10px] transition-colors"
                :class="i + 1 === step ? 'text-emerald-600 font-semibold' : 'text-gray-300'">
                {{ label }}
              </span>
            </div>
          </div>

          <!-- Contenu scrollable -->
          <div class="flex-1 overflow-y-auto overscroll-contain px-5 py-4">

            <!-- ── Étape 0 : Invité ou Connecté ── -->
            <div v-if="step === 0">
              <p class="text-gray-500 text-sm mb-5">{{ $t('appointment.howToContinue') }}</p>
              <div class="space-y-3">
                <!-- Sans compte -->
                <button @click="chooseGuest"
                  class="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-emerald-300 hover:bg-emerald-50 active:scale-[0.98] transition-all text-left">
                  <div class="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <i class="fas fa-user-clock text-emerald-600 text-lg"></i>
                  </div>
                  <div class="flex-1">
                    <div class="font-semibold text-gray-800">{{ $t('appointment.withoutAccount') }}</div>
                    <div class="text-xs text-gray-400 mt-0.5">{{ $t('appointment.guestHint') }}</div>
                  </div>
                  <i class="fas fa-chevron-right text-gray-300"></i>
                </button>

                <!-- Avec compte -->
                <button @click="chooseAccount"
                  class="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50 active:scale-[0.98] transition-all text-left">
                  <div class="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                    <i class="fas fa-user-check text-blue-600 text-lg"></i>
                  </div>
                  <div class="flex-1">
                    <div class="font-semibold text-gray-800">{{ $t('appointment.withAccount') }}</div>
                    <div class="text-xs text-gray-400 mt-0.5">{{ $t('appointment.accountHint') }}</div>
                  </div>
                  <i class="fas fa-chevron-right text-gray-300"></i>
                </button>
              </div>
            </div>

            <!-- ── Étape 1 : Infos patient (invité) ── -->
            <div v-if="step === 1 && isGuest">
              <p class="text-gray-500 text-sm mb-4">{{ $t('appointment.yourDetails') }}</p>
              <div class="space-y-3">
                <div>
                  <label class="text-xs font-semibold text-gray-600 mb-1 block">{{ $t('appointment.fullName') }} *</label>
                  <input v-model="guest.name" type="text" :placeholder="$t('appointment.fullNamePlaceholder')"
                    class="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all placeholder-gray-300"
                    :class="{'border-red-400': errors.name}">
                  <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
                </div>
                <div>
                  <label class="text-xs font-semibold text-gray-600 mb-1 block">{{ $t('auth.phone') }} *</label>
                  <input v-model="guest.phone" type="tel" placeholder="+237 6XX XX XX XX"
                    class="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all placeholder-gray-300"
                    :class="{'border-red-400': errors.phone}">
                  <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
                  <p v-if="guest.phone && !errors.phone" class="text-gray-400 text-xs mt-1">{{ $t('appointment.phoneFormat') }}</p>
                </div>
                <div>
                  <label class="text-xs font-semibold text-gray-600 mb-1 block">Email <span class="text-red-500">*</span> <span class="text-gray-400 font-normal">({{ $t('appointment.forConfirmation') }})</span></label>
                  <input v-model="guest.email" type="email" placeholder="juniordema@example.com"
                    class="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all placeholder-gray-300"
                    :class="{'border-red-400': errors.email}">
                  <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
                </div>
              </div>
            </div>

            <!-- ── Étape 1 : Choix service ── -->
            <div v-if="(step === 1 && !isGuest) || step === 2">
              <p class="text-gray-500 text-sm mb-3">{{ $t('appointment.selectSpecialty') }}</p>
              <div class="grid gap-2">
                <button v-for="svc in services" :key="svc.name"
                  @click="selectService(svc)"
                  class="flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left active:scale-[0.98] transition-all"
                  :class="selectedService?.name === svc.name ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 hover:border-emerald-200'">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="svc.bgClass">
                    <i :class="svc.icon" :style="{ color: svc.color }"></i>
                  </div>
                  <span class="font-medium text-gray-800 text-sm">{{ locale === 'en' ? (svc.nameEn || svc.name) : svc.name }}</span>
                  <i v-if="selectedService?.name === svc.name" class="fas fa-check-circle text-emerald-500 ml-auto text-lg"></i>
                </button>
              </div>
            </div>

            <!-- ── Étape médecin ── -->
            <div v-if="(isGuest && step === 3) || (!isGuest && step === 2)">
              <p class="text-gray-500 text-sm mb-3">{{ $t('appointment.selectDoctorPrompt') }}</p>
              <div class="grid gap-3">
                <button v-for="doc in filteredDoctors" :key="doc.id"
                  @click="selectedDoctor = doc; selectedDate = ''; selectedTime = ''"
                  class="flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left active:scale-[0.98] transition-all"
                  :class="selectedDoctor?.id === doc.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 hover:border-emerald-200'">
                  <img :src="doc.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${doc.firstName}`" :alt="`Dr. ${doc.firstName} ${doc.lastName}`" class="w-14 h-14 rounded-2xl object-cover shrink-0">
                  <div class="flex-1 min-w-0">
                    <div class="font-semibold text-gray-800 text-sm">Dr. {{ doc.firstName }} {{ doc.lastName }}</div>
                    <div class="text-gray-400 text-xs mt-0.5">{{ doc.specialization }}</div>
                    <div class="flex items-center gap-2 mt-1.5">
                      <span class="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                        💰 {{ doc.consultationFee?.toLocaleString('fr-FR') }} FCFA
                      </span>
                    </div>
                  </div>
                  <i v-if="selectedDoctor?.id === doc.id" class="fas fa-check-circle text-emerald-500 text-lg shrink-0"></i>
                </button>
              </div>
            </div>

            <!-- ── Étape date & heure ── -->
            <div v-if="(isGuest && step === 4) || (!isGuest && step === 3)">
              <!-- Dates -->
              <p class="text-gray-500 text-sm mb-3">{{ $t('appointment.selectDatePrompt') }}</p>
              <div class="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
                <button v-for="d in availableDates" :key="d"
                  @click="selectDate(d)"
                  class="shrink-0 snap-start w-14 py-3 rounded-2xl border-2 text-center active:scale-95 transition-all"
                  :class="selectedDate === d ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-100 hover:border-emerald-200 text-gray-700'">
                  <div class="text-[10px] font-medium" :class="selectedDate === d ? 'text-emerald-100' : 'text-gray-400'">{{ getDayName(d) }}</div>
                  <div class="font-bold text-base">{{ getDayNum(d) }}</div>
                  <div class="text-[10px]" :class="selectedDate === d ? 'text-emerald-100' : 'text-gray-400'">{{ getMonthShort(d) }}</div>
                </button>
              </div>

              <!-- Créneaux horaires -->
              <div v-if="selectedDate" class="mt-5">
                <div class="flex items-center justify-between mb-3">
                  <p class="text-gray-500 text-sm">{{ $t('appointment.availableSlots') }}</p>
                  <span v-if="loadingSlots" class="text-xs text-emerald-500 flex items-center gap-1">
                    <i class="fas fa-circle-notch fa-spin"></i> {{ $t('messages.loading') }}
                  </span>
                  <span v-else class="text-xs text-gray-400">{{ $t('appointment.slotsCount', { count: availableTimes.length }) }}</span>
                </div>

                <div v-if="!loadingSlots && availableTimes.length === 0"
                  class="text-center py-6 text-gray-400 text-sm bg-gray-50 rounded-2xl">
                  <i class="fas fa-calendar-times text-2xl mb-2 block text-gray-300"></i>
                  {{ $t('appointment.noSlotsForDay') }}
                </div>

                <div v-else class="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <button v-for="t in availableTimes" :key="t"
                    @click="selectedTime = t"
                    class="py-2.5 rounded-xl border-2 text-sm font-medium active:scale-95 transition-all"
                    :class="selectedTime === t ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-100 hover:border-emerald-200 text-gray-700'">
                    {{ t }}
                  </button>
                </div>
              </div>

              <!-- Note durée -->
              <p class="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                <i class="fas fa-clock text-emerald-400"></i>
                {{ $t('appointment.duration') }}
              </p>
            </div>

            <!-- ── Étape confirmation ── -->
            <div v-if="(isGuest && step === 5) || (!isGuest && step === 4)">
              <p class="text-gray-500 text-sm mb-4">{{ $t('appointment.review') }}</p>

              <!-- Résumé -->
              <div class="bg-gray-50 rounded-2xl p-4 space-y-3 mb-4">
                <div v-if="isGuest" class="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span class="text-gray-500 text-sm">{{ $t('appointment.patient') }}</span>
                  <span class="font-semibold text-gray-800 text-sm">{{ guest.name }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 text-sm flex items-center gap-2"><i class="fas fa-stethoscope text-emerald-400 w-4"></i>{{ $t('nav.services') }}</span>
                  <span class="font-semibold text-gray-800 text-sm">{{ selectedService?.name }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 text-sm flex items-center gap-2"><i class="fas fa-user-md text-emerald-400 w-4"></i>{{ $t('nav.doctors') }}</span>
                  <span class="font-semibold text-gray-800 text-sm">Dr. {{ selectedDoctor?.firstName }} {{ selectedDoctor?.lastName }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 text-sm flex items-center gap-2"><i class="fas fa-calendar text-emerald-400 w-4"></i>{{ $t('appointment.selectDate') }}</span>
                  <span class="font-semibold text-gray-800 text-sm">{{ formatDate(selectedDate) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 text-sm flex items-center gap-2"><i class="fas fa-clock text-emerald-400 w-4"></i>{{ $t('appointment.selectTime') }}</span>
                  <span class="font-semibold text-gray-800 text-sm">{{ selectedTime }}</span>
                </div>
              </div>

              <!-- Notes -->
              <div class="mb-4">
                <label class="text-xs font-semibold text-gray-600 mb-1.5 block">{{ $t('appointment.reason') }} <span class="text-gray-400 font-normal">({{ $t('common.optional') }})</span></label>
                <textarea v-model="notes" rows="3"
                  class="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
                  :placeholder="$t('appointment.reasonPlaceholder')">
                </textarea>
              </div>

              <!-- Info email -->
              <div v-if="isGuest && guest.email" class="flex items-start gap-2 bg-blue-50 rounded-xl p-3 mb-4">
                <i class="fas fa-envelope text-blue-400 mt-0.5"></i>
                <p class="text-xs text-blue-600">{{ $t('appointment.emailSentTo') }} <strong>{{ guest.email }}</strong></p>
              </div>

              <!-- Info email pour patient connecté -->
              <div v-if="!isGuest && authStore.user?.email" class="flex items-start gap-2 bg-green-50 rounded-xl p-3 mb-4">
                <i class="fas fa-envelope text-green-400 mt-0.5"></i>
                <p class="text-xs text-green-600">{{ $t('appointment.emailSentTo') }} <strong>{{ authStore.user.email }}</strong></p>
              </div>
            </div>

          </div>

          <!-- Footer boutons sticky -->
          <div class="px-5 py-4 border-t border-gray-100 bg-white rounded-b-3xl">
            <div class="flex gap-3">
              <!-- Retour -->
              <button v-if="step > 0" @click="prevStep"
                class="w-12 h-12 rounded-2xl border-2 border-gray-100 flex items-center justify-center text-gray-500 active:scale-95 transition-all shrink-0">
                <i class="fas fa-arrow-left text-sm"></i>
              </button>

              <!-- Confirmer (dernière étape) -->
              <button v-if="isLastStep" @click="confirmAppointment" :disabled="isLoading"
                class="flex-1 h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                <i v-if="isLoading" class="fas fa-circle-notch fa-spin"></i>
                <i v-else class="fas fa-check-circle"></i>
                {{ isLoading ? $t('appointment.booking') : $t('appointment.confirmButton') }}
              </button>

              <!-- Suivant -->
              <button v-else @click="nextStepGuard" :disabled="!canProceed"
                class="flex-1 h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                {{ $t('buttons.next') }} <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { services } from '@/data/services'
import { useAppointmentStore } from '@/stores/appointmentStore'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'
import { useDoctorStore } from '@/stores/doctorStore'
import apiClient from '@/api/client'
import { isValidEmail, isValidPhone, getEmailError, getPhoneError } from '@/utils/validation'

// Props and emits
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()
const toastStore = useToastStore()
const doctorStore = useDoctorStore()
const { locale, t } = useI18n()

// Docteurs chargés depuis l'API
const doctors = ref([])
const loadingDoctors = ref(false)

function closeAppointment() {
  emit('close')
}

// ── Charger les docteurs depuis l'API ────────────────
async function fetchDoctors() {
  loadingDoctors.value = true
  try {
    const response = await apiClient.get('/doctors')
    doctors.value = response.data || []
  } catch (error) {
    console.error('Erreur chargement docteurs:', error)
    toastStore.addToast(t('appointment.loadDoctorsError'), 'error')
  } finally {
    loadingDoctors.value = false
  }
}

// Charger les docteurs quand le modal s'ouvre
watch(() => props.isOpen, (isOpen) => {
  if (isOpen && doctors.value.length === 0) {
    fetchDoctors()
  }
})

// ── État local ───────────────────────────────────────
const isGuest   = ref(false)
const step      = ref(0)
const isLoading = ref(false)
const loadingSlots = ref(false)

const guest = ref({ name: '', phone: '', email: '' })
const errors = ref({})

const selectedService = ref(null)
const selectedDoctor  = ref(null)
const selectedDate    = ref('')
const selectedTime    = ref('')
const availableTimes  = ref([])
const notes           = ref('')

// ── Étapes dynamiques ───────────────────────────────
// Invité  : 0=accueil 1=infos 2=service 3=médecin 4=date 5=confirm
// Connecté: 0=accueil 1=service 2=médecin 3=date 4=confirm
const totalSteps  = computed(() => isGuest.value ? 5 : 4)
const stepLabels  = computed(() => isGuest.value
  ? [t('appointment.steps.welcome'), t('appointment.steps.details'), t('appointment.steps.service'), t('appointment.steps.doctor'), t('appointment.steps.date'), t('appointment.steps.confirmation')]
  : [t('appointment.steps.welcome'), t('appointment.steps.service'), t('appointment.steps.doctor'), t('appointment.steps.date'), t('appointment.steps.confirmation')]
)
const isLastStep = computed(() => step.value === totalSteps.value)

// ── Garde : peut-on passer à l'étape suivante ? ─────
const canProceed = computed(() => {
  if (step.value === 0) return true
  if (isGuest.value) {
    if (step.value === 1) return guest.value.name.trim().length > 1 && guest.value.phone.trim().length > 5
    if (step.value === 2) return !!selectedService.value
    if (step.value === 3) return !!selectedDoctor.value
    if (step.value === 4) return !!selectedDate.value && !!selectedTime.value
  } else {
    if (step.value === 1) return !!selectedService.value
    if (step.value === 2) return !!selectedDoctor.value
    if (step.value === 3) return !!selectedDate.value && !!selectedTime.value
  }
  return true
})

// ── Dates disponibles ────────────────────────────────
const availableDates = computed(() => {
  const dates = []
  const d = new Date()
  d.setDate(d.getDate() + 1)
  let count = 0
  while (count < 14) {
    if (d.getDay() !== 0) { dates.push(d.toISOString().split('T')[0]); count++ }
    d.setDate(d.getDate() + 1)
  }
  return dates
})

function getDayName(s) {
  return s ? new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'fr-FR', { weekday: 'short' }).format(new Date(s + 'T00:00:00')) : ''
}
function getDayNum(s)  { return s ? new Date(s + 'T00:00:00').getDate() : '' }
function getMonthShort(s) {
  return s ? new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'fr-FR', { month: 'short' }).format(new Date(s + 'T00:00:00')) : ''
}
function formatDate(s) {
  if (!s) return ''
  const d = new Date(s + 'T00:00:00')
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
}

// ── Réinitialiser le modal au bon état ──────────────
function resetModal() {
  // Si l'utilisateur est connecté, sauter l'étape 0
  if (authStore.isAuthenticated) {
    isGuest.value = false
    step.value = 1  // Aller directement à la sélection de service
  } else {
    // Sinon, afficher le choix compte/sans compte
    isGuest.value = false
    step.value = 0
  }
  
  // Réinitialiser les données
  selectedService.value = null
  selectedDoctor.value = null
  selectedDate.value = ''
  selectedTime.value = ''
  guest.value = { name: '', phone: '', email: '' }
  errors.value = {}
  notes.value = ''
}

// ── Watcher pour détecter l'ouverture du modal ──────
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    resetModal()
  }
})

// ── Médecins filtrés par service ─────────────────────
const filteredDoctors = computed(() => {
  if (!selectedService.value) return doctors.value
  
  return doctors.value.filter(d => {
    // Vérifier d'abord specialties (données statiques)
    if (d.specialties?.includes(selectedService.value.name)) return true
    
    // Vérifier specialization (données API backend)
    if (d.specialization && d.specialization.includes(selectedService.value.name)) return true
    
    // Mapping spécifique pour "Consultation Générale" <-> "Médecine Générale"
    if (selectedService.value.name === 'Consultation Générale' && 
        (d.specialization === 'Médecine Générale' || d.specialties?.includes('Consultation Générale'))) {
      return true
    }
    
    return false
  })
})

// ── Charger les créneaux dispo automatiquement ───────
async function fetchSlots(doctorId, date) {
  if (!doctorId || !date) { availableTimes.value = []; return }
  loadingSlots.value = true
  try {
    const response = await apiClient.get('/slots', {
      params: { doctorId, date }
    })
    availableTimes.value = response.data.available || []
  } catch (error) {
    console.error('Erreur chargement créneaux:', error)
    availableTimes.value = []
  } finally {
    loadingSlots.value = false
  }
}

watch([selectedDoctor, selectedDate], ([doc, date]) => {
  selectedTime.value = ''
  if (doc && date) fetchSlots(doc.id, date)
})

function selectDate(d) {
  selectedDate.value = d
  selectedTime.value = ''
}

// ── Navigation ───────────────────────────────────────
function chooseGuest() {
  isGuest.value = true
  step.value = 1
}

function chooseAccount() {
  if (!authStore.isAuthenticated) {
    closeAppointment()
    toastStore.addToast(t('appointment.loginRequired'), 'info')
    // Will redirect via router guard
    return
  }
  isGuest.value = false
  step.value = 1
}

function selectService(svc) {
  selectedService.value = svc
  selectedDoctor.value = null
  selectedDate.value = ''
  selectedTime.value = ''
}

function validateGuestStep() {
  errors.value = {}

  // Validation du nom
  if (!guest.value.name?.trim()) {
    errors.value.name = t('appointment.errors.nameRequired')
  } else if (guest.value.name.trim().length < 3 || guest.value.name.trim().length > 100) {
    errors.value.name = t('appointment.errors.nameLength')
  }

  // Validation du téléphone - STRICT
  if (!guest.value.phone?.trim()) {
    errors.value.phone = t('appointment.errors.phoneRequired')
  } else {
    const phoneError = getPhoneError(guest.value.phone)
    if (phoneError) {
      errors.value.phone = phoneError
    } else if (!isValidPhone(guest.value.phone)) {
      errors.value.phone = t('appointment.errors.phoneFormat')
    }
  }

  // Validation de l'email - STRICT
  if (!guest.value.email?.trim()) {
    errors.value.email = t('appointment.errors.emailRequired')
  } else {
    const emailError = getEmailError(guest.value.email)
    if (emailError) {
      errors.value.email = emailError
    } else if (!isValidEmail(guest.value.email)) {
      errors.value.email = t('appointment.errors.emailFormat')
    }
  }

  return Object.keys(errors.value).length === 0
}

function nextStepGuard() {
  if (isGuest.value && step.value === 1 && !validateGuestStep()) return
  if (canProceed.value) step.value++
}

function prevStep() {
  if (step.value > 0) step.value--
}

// ── Confirmation ─────────────────────────────────────
async function confirmAppointment() {
  // Validation: email obligatoire
  if (isGuest.value && !guest.value.email.trim()) {
    toastStore.addToast(t('appointment.errors.emailConfirmationRequired'), 'error')
    return
  }

  // Pour patients connectés, vérifier que l'email existe
  if (!isGuest.value && !authStore.user?.email) {
    toastStore.addToast(t('appointment.errors.missingUserEmail'), 'error')
    return
  }

  isLoading.value = true
  try {
    let response
    if (isGuest.value) {
      response = await apiClient.post('/appointments/guest', {
        guestName: guest.value.name,
        guestPhone: guest.value.phone,
        guestEmail: guest.value.email,
        doctorId: selectedDoctor.value?.id,
        serviceName: selectedService.value?.name || '',
        date: selectedDate.value,
        time: selectedTime.value,
        notes: notes.value
      })
    } else {
      response = await apiClient.post('/appointments', {
        doctorId: selectedDoctor.value?.id,
        serviceName: selectedService.value?.name || '',
        date: selectedDate.value,
        time: selectedTime.value,
        notes: notes.value
      })
    }

    closeAppointment()
    toastStore.addToast(`Demande envoyee. Validation en attente du medecin. Email envoye a ${isGuest.value ? guest.value.email : authStore.user?.email}`, 'success')
    await appointmentStore.fetchMyAppointments()
    resetForm()

  } catch (err) {
    toastStore.addToast(err.response?.data?.error || err.message || t('appointment.bookingError'), 'error')
  } finally {
    isLoading.value = false
  }
}

function resetForm() {
  step.value = 0
  isGuest.value = false
  guest.value = { name: '', phone: '', email: '' }
  errors.value = {}
  selectedService.value = null
  selectedDoctor.value = null
  selectedDate.value = ''
  selectedTime.value = ''
  notes.value = ''
  availableTimes.value = []
}

// Appliquer le mode forcé à l'ouverture - voir App.vue
watch(() => authStore.isAuthenticated, () => {
  // Auto-update when auth changes
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { 
  transition: all 0.3s ease; 
}
.modal-enter-from, .modal-leave-to { 
  opacity: 0; 
}
.modal-enter-from > div:last-child { 
  transform: translateY(100%); 
}
@media (min-width: 640px) {
  .modal-enter-from > div:last-child { 
    transform: scale(0.95) translateY(0); 
  }
}
</style>
