import { ref, reactive, computed, watch } from 'vue'
import { useToast } from './useToast'
import { useAuth } from './useAuth'
import { useApi } from './useApi'

const showAppointment = ref(false)
const appointmentStep = ref(1)
const selectedService = ref(null)
const selectedDoctor = ref(null)
const selectedDate = ref('')
const selectedTime = ref('')
const appointmentNotes = ref('')
const patientAppointments = reactive([])
const bookedTimes = reactive([])
const forcedMode = ref(null)
const isLoading = ref(false)

const allTimes = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30']
const dayNames = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
const monthNames = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']
const monthFull = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre']

// Watcher auto : récupère les créneaux pris quand médecin + date changent
watch([selectedDoctor, selectedDate], async ([doctor, date]) => {
  bookedTimes.splice(0)
  if (!doctor || !date) return
  try {
    const res = await fetch(`http://localhost:3000/api/slots?doctorId=${doctor.id}&date=${date}`)
    const json = await res.json()
    bookedTimes.push(...(json.taken || []))
  } catch { /* silencieux si API indisponible */ }
})

export function useAppointments() {
  const { addToast } = useToast()
  const { isLoggedIn, openLogin } = useAuth()
  const api = useApi()

  // mode: null=affiche le choix | 'guest'=force invité | 'account'=force compte
  function openAppointment(prefillService = null, mode = null) {
    forcedMode.value = mode
    selectedService.value = prefillService || null
    selectedDoctor.value = null
    selectedDate.value = ''
    selectedTime.value = ''
    appointmentNotes.value = ''
    bookedTimes.splice(0)
    showAppointment.value = true
  }

  function closeAppointment() {
    showAppointment.value = false
    selectedService.value = null
    selectedDoctor.value = null
    selectedDate.value = ''
    selectedTime.value = ''
  }

  function selectService(svc) {
    selectedService.value = svc
    selectedDoctor.value = null
  }

  function nextStep() { if (appointmentStep.value < 4) appointmentStep.value++ }
  function prevStep() { if (appointmentStep.value > 1) appointmentStep.value-- }

  // Dates disponibles : 10 prochains jours hors dimanche
  const availableDates = computed(() => {
    const dates = []
    const d = new Date()
    d.setDate(d.getDate() + 1)
    let count = 0
    while (count < 10) {
      if (d.getDay() !== 0) {
        dates.push(d.toISOString().split('T')[0])
        count++
      }
      d.setDate(d.getDate() + 1)
    }
    return dates
  })

  // Créneaux disponibles = tous - ceux déjà réservés
  const availableTimes = computed(() => {
    if (!selectedDoctor.value || !selectedDate.value) return []
    return allTimes.filter(t => !bookedTimes.includes(t))
  })

  // Charger les RDV du patient depuis l'API
  async function loadPatientAppointments() {
    if (!isLoggedIn.value) return
    isLoading.value = true
    try {
      const data = await api.get('/appointments')
      patientAppointments.splice(0)
      data.forEach(a => patientAppointments.push(a))
    } catch (err) {
      addToast('Erreur lors du chargement des rendez-vous', 'error')
    } finally {
      isLoading.value = false
    }
  }

  // Créer un RDV via l'API
  async function confirmAppointment() {
    isLoading.value = true
    try {
      const newApt = await api.post('/appointments', {
        serviceName: selectedService.value?.name,
        doctorId: selectedDoctor.value?.id,
        doctorName: selectedDoctor.value?.name,
        date: selectedDate.value,
        time: selectedTime.value,
        notes: appointmentNotes.value
      })
      patientAppointments.push(newApt)
      showAppointment.value = false
      appointmentStep.value = 1
      addToast('Rendez-vous confirmé avec succès', 'success')
    } catch (err) {
      addToast(err.message || 'Erreur lors de la réservation', 'error')
    } finally {
      isLoading.value = false
    }
  }

  // Annuler un RDV
  async function cancelAppointment(id) {
    try {
      const updated = await api.patch(`/appointments/${id}/cancel`)
      const idx = patientAppointments.findIndex(a => a.id === id)
      if (idx !== -1) patientAppointments[idx] = updated
      addToast('Rendez-vous annulé', 'info')
    } catch (err) {
      addToast(err.message || 'Erreur lors de l\'annulation', 'error')
    }
  }

  const upcomingCount = computed(() => patientAppointments.filter(a => a.status === 'à venir').length)
  const pastCount    = computed(() => patientAppointments.filter(a => a.status !== 'à venir').length)
  const nextAppointment = computed(() => patientAppointments.find(a => a.status === 'à venir') || null)

  // Helpers de formatage — protégés contre les valeurs vides
  function getDayName(dateStr) {
    if (!dateStr) return ''
    return dayNames[new Date(dateStr + 'T00:00:00').getDay()] || ''
  }
  function getDayNum(dateStr) {
    if (!dateStr) return ''
    return new Date(dateStr + 'T00:00:00').getDate()
  }
  function getMonthShort(dateStr) {
    if (!dateStr) return ''
    return monthNames[new Date(dateStr + 'T00:00:00').getMonth()] || ''
  }
  function formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr + 'T00:00:00')
    return d.getDate() + ' ' + (monthFull[d.getMonth()] || '') + ' ' + d.getFullYear()
  }

  return {
    showAppointment, appointmentStep, selectedService, selectedDoctor,
    selectedDate, selectedTime, appointmentNotes, isLoading,
    patientAppointments, availableDates, availableTimes,
    upcomingCount, pastCount, nextAppointment,
    forcedMode,
    openAppointment, closeAppointment, selectService,
    nextStep, prevStep, confirmAppointment, cancelAppointment,
    loadPatientAppointments,
    getDayName, getDayNum, getMonthShort, formatDate
  }
}
