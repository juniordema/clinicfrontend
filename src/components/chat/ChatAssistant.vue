<template>
  <!-- Bouton flottant -->
  <div class="fixed bottom-5 right-5 z-[200]">

    <!-- Bulle de bienvenue -->
    <Transition name="bubble">
      <div v-if="showBubble && !chatOpen"
        class="absolute bottom-16 right-0 bg-white rounded-2xl rounded-br-sm shadow-xl border border-gray-100 p-3 w-56 mb-2">
        <p class="text-sm text-gray-700 font-medium">👋 {{ t('chat.needHelp') }}</p>
        <p class="text-xs text-gray-400 mt-0.5">{{ t('chat.replyFast') }}</p>
        <button @click="showBubble = false" class="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
          <i class="fas fa-times text-gray-500 text-[9px]"></i>
        </button>
      </div>
    </Transition>

    <!-- Fenêtre de chat -->
    <Transition name="chat">
      <div v-if="chatOpen"
        class="fixed sm:absolute inset-0 sm:inset-auto sm:bottom-16 sm:right-0 bg-white sm:w-80 sm:rounded-3xl sm:shadow-2xl sm:border sm:border-gray-100 flex flex-col z-[200]">

        <!-- Header -->
        <div class="bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 flex items-center gap-3 sm:rounded-t-3xl">
          <!-- Bouton retour mobile -->
          <button @click="chatOpen = false" class="sm:hidden w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
            <i class="fas fa-arrow-left text-sm"></i>
          </button>
          <div class="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <i class="fas fa-robot text-white"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-white font-semibold text-sm">{{ t('chat.assistantName') }}</div>
            <div class="text-emerald-200 text-xs flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
              {{ t('chat.onlineNow') }}
            </div>
          </div>
          <button @click="chatOpen = false" class="hidden sm:flex w-8 h-8 rounded-xl hover:bg-white/20 items-center justify-center text-white/70 hover:text-white transition-colors">
            <i class="fas fa-times text-sm"></i>
          </button>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3 overscroll-contain" ref="chatContainer"
          style="background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);">
          <div v-for="(msg, i) in messages" :key="i"
            class="flex gap-2 animate-fadein"
            :class="msg.from === 'bot' ? '' : 'flex-row-reverse'">
            <div v-if="msg.from === 'bot'" class="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-1">
              <i class="fas fa-robot text-emerald-600 text-xs"></i>
            </div>
            <div class="max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl"
              :class="msg.from === 'bot'
                ? 'bg-white text-gray-700 rounded-tl-sm shadow-sm border border-gray-100'
                : 'bg-emerald-500 text-white rounded-tr-sm'">
              {{ msg.text }}
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="flex gap-2">
            <div class="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <i class="fas fa-robot text-emerald-600 text-xs"></i>
            </div>
            <div class="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
              <span v-for="n in 3" :key="n" class="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" :style="`animation-delay:${(n-1)*0.15}s`"></span>
            </div>
          </div>
        </div>

        <!-- Suggestions rapides -->
        <div v-if="messages.length <= 2" class="px-4 pb-2 flex flex-wrap gap-1.5">
          <button v-for="s in suggestions" :key="s"
            @click="send(s)"
            class="text-xs bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-100 hover:bg-emerald-100 active:scale-95 transition-all font-medium">
            {{ s }}
          </button>
        </div>

        <!-- Input -->
        <div class="p-3 border-t border-gray-100 flex gap-2 bg-white sm:rounded-b-3xl">
          <input
            v-model="inputText"
            @keyup.enter="send()"
            type="text"
            :placeholder="t('chat.placeholder')"
            class="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
          >
          <button @click="send()"
            class="w-10 h-10 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center transition-all shrink-0">
            <i class="fas fa-paper-plane text-sm"></i>
          </button>
        </div>

      </div>
    </Transition>

    <!-- Bouton principal -->
    <button @click="toggleChat"
      class="w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-all active:scale-95"
      :class="chatOpen ? 'bg-gray-700 hover:bg-gray-800' : 'bg-emerald-500 hover:bg-emerald-600'">
      <i class="fas text-xl text-white transition-all"
        :class="chatOpen ? 'fa-times' : 'fa-comment-dots'"></i>
    </button>

  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const chatOpen   = ref(false)
const showBubble = ref(false)
const inputText  = ref('')
const isTyping   = ref(false)
const chatContainer = ref(null)

const messages = ref([{ from: 'bot', text: t('chat.welcome') }])

const suggestions = computed(() =>
  locale.value === 'en'
    ? ['📅 Book appointment', '📋 Full procedure', '🕒 Opening hours', '📍 Address', '🚨 Emergencies', '💰 Pricing']
    : ['📅 Prendre RDV', '📋 Procédure complète', '🕒 Horaires', '📍 Adresse', '🚨 Urgences', '💰 Tarifs']
)

const responses = computed(() => locale.value === 'en'
  ? {
      appointment: 'To book an appointment, click "Appointment" in the menu. You can book without creating an account.\n\n1. Choose whether to continue with or without an account.\n2. If you continue as a guest, enter your full name, phone number and email.\n3. Select the specialty you need.\n4. Choose the doctor.\n5. Pick a date and an available time slot.\n6. Review the summary and confirm.\n7. You will receive a confirmation email with your appointment details.',
      book: 'Click "Appointment" in the menu. Booking takes less than two minutes.\n\n1. Open the booking form.\n2. Choose guest mode or sign in.\n3. Fill in your details.\n4. Select the service, doctor, date and time.\n5. Confirm the appointment.\n6. Check your email for the confirmation message.',
      procedure: 'Full appointment procedure:\n\n1. Click the chat or the "Appointment" button.\n2. Choose one of the two options:\n   - without an account for fast booking\n   - with an account if you want history and reminders\n3. Enter your personal details:\n   - full name\n   - phone number\n   - email address\n4. Select the medical specialty you need.\n5. Choose the available doctor.\n6. Choose a date.\n7. Choose an available time slot.\n8. Add the reason for consultation if needed.\n9. Review the summary.\n10. Confirm the appointment.\n11. Receive the confirmation email and keep it for your visit.',
      steps: 'Here are the steps:\n1. Open the booking form.\n2. Choose guest or account mode.\n3. Fill in your information.\n4. Choose service, doctor, date and time.\n5. Confirm.\n6. Receive the email confirmation.',
      how: 'If you want the complete procedure, here it is:\n1. Click "Appointment".\n2. Choose guest or account mode.\n3. Fill in your details.\n4. Select specialty, doctor, date and time.\n5. Confirm the request.\n6. Receive the email confirmation.',
      hours: 'We are open:\n🗓 Monday - Saturday: 7:30 AM - 6:00 PM\n🚨 Emergencies: 24/7',
      address: '📍 Angelo Medical Center\nLogpom district, Douala\nEasy to access by taxi or car.',
      emerg: '🚨 In case of emergency:\n📞 +237 6 99 88 77 66\nOr come directly in. Our emergency unit is open 24/7.',
      price: 'General consultations start from 5,000 FCFA. Prices vary by specialty. Contact us for a quote.',
      pricing: 'General consultations start from 5,000 FCFA. Prices vary by specialty. Contact us for a quote.',
      service: 'Our services include general medicine, cardiology, pediatrics, gynecology, dermatology, ophthalmology, medical imaging and 24/7 emergencies.',
      hello: 'Hello! 😊 How can I help you today?',
      hi: 'Hi! Welcome to Angelo Medical Center. How can I help?',
      thanks: 'You are welcome. Let me know if you need anything else.',
      doctor: 'We have specialists in cardiology, pediatrics, gynecology, dermatology and ophthalmology. Which one do you need?',
      contact: '📞 +237 6 99 88 77 66\n📧 contact@angelo-clinic.cm\n📍 Logpom district, Douala'
    }
  : {
      rendez: 'Pour prendre rendez-vous, cliquez sur "Prendre Rendez-vous" dans le menu. Vous pouvez réserver sans créer de compte.\n\n1. Choisissez si vous continuez avec ou sans compte.\n2. Si vous êtes invité, renseignez votre nom complet, téléphone et email.\n3. Sélectionnez la spécialité.\n4. Choisissez le médecin.\n5. Choisissez une date puis un créneau disponible.\n6. Vérifiez le récapitulatif.\n7. Confirmez pour recevoir l\'email de confirmation.',
      rdv: 'Cliquez sur "Prendre Rendez-vous" dans le menu. Vous pouvez réserver en moins de 2 minutes.\n\n1. Ouvrez le formulaire.\n2. Choisissez invité ou compte.\n3. Remplissez vos informations.\n4. Choisissez le service, le médecin, la date et l\'heure.\n5. Confirmez.\n6. Vérifiez votre email de confirmation.',
      procédure: 'Voici la procédure complète pour un patient :\n\n1. Cliquez sur le bouton "Prendre Rendez-vous" ou ouvrez le chat.\n2. Choisissez l\'une des deux options :\n   - sans compte pour une réservation rapide\n   - avec compte pour garder l\'historique et recevoir des rappels\n3. Renseignez vos informations personnelles :\n   - nom complet\n   - numéro de téléphone\n   - adresse email\n4. Choisissez la spécialité médicale souhaitée.\n5. Sélectionnez le médecin disponible.\n6. Choisissez une date de consultation.\n7. Choisissez un créneau horaire disponible.\n8. Ajoutez le motif de consultation si nécessaire.\n9. Vérifiez le récapitulatif.\n10. Confirmez le rendez-vous.\n11. Vous recevez ensuite un email de confirmation avec les détails du rendez-vous.',
      procedure: 'Voici la procédure complète pour un patient :\n\n1. Cliquez sur le bouton "Prendre Rendez-vous" ou ouvrez le chat.\n2. Choisissez l\'une des deux options :\n   - sans compte pour une réservation rapide\n   - avec compte pour garder l\'historique et recevoir des rappels\n3. Renseignez vos informations personnelles :\n   - nom complet\n   - numéro de téléphone\n   - adresse email\n4. Choisissez la spécialité médicale souhaitée.\n5. Sélectionnez le médecin disponible.\n6. Choisissez une date de consultation.\n7. Choisissez un créneau horaire disponible.\n8. Ajoutez le motif de consultation si nécessaire.\n9. Vérifiez le récapitulatif.\n10. Confirmez le rendez-vous.\n11. Vous recevez ensuite un email de confirmation avec les détails du rendez-vous.',
      étapes: 'Voici les étapes :\n1. Ouvrir le formulaire de rendez-vous.\n2. Choisir invité ou compte.\n3. Remplir les informations.\n4. Choisir service, médecin, date et heure.\n5. Confirmer.\n6. Recevoir l\'email de confirmation.',
      etape: 'Voici les étapes :\n1. Ouvrir le formulaire de rendez-vous.\n2. Choisir invité ou compte.\n3. Remplir les informations.\n4. Choisir service, médecin, date et heure.\n5. Confirmer.\n6. Recevoir l\'email de confirmation.',
      comment: 'Si vous voulez la procédure complète :\n1. Cliquez sur "Prendre Rendez-vous".\n2. Choisissez invité ou compte.\n3. Remplissez vos coordonnées.\n4. Sélectionnez la spécialité, le médecin, la date et l\'heure.\n5. Confirmez la demande.\n6. Recevez l\'email de confirmation.',
      horaire: 'Nous sommes ouverts :\n🗓 Lundi – Samedi : 7h30 – 18h00\n🚨 Urgences : 24h/24, 7j/7',
      adresse: '📍 Centre Médical Angelo\nQuartier Logpom, Douala\nFacilement accessible en taxi ou en voiture.',
      urgence: '🚨 En cas d\'urgence :\n📞 +237 6 99 88 77 66\nOu présentez-vous directement — notre service urgences est ouvert 24h/24.',
      prix: 'Les consultations générales débutent à partir de 5 000 FCFA. Les tarifs varient selon la spécialité. Contactez-nous pour un devis.',
      tarif: 'Les consultations générales débutent à partir de 5 000 FCFA. Les tarifs varient selon la spécialité. Contactez-nous pour un devis.',
      service: 'Nos services : Médecine Générale, Cardiologie, Pédiatrie, Gynécologie, Dermatologie, Ophtalmologie, Imagerie médicale, Urgences 24h/24.',
      bonjour: 'Bonjour ! 😊 Comment puis-je vous aider aujourd\'hui ?',
      salut: 'Salut ! Bienvenue au Centre Médical Angelo. Que puis-je faire pour vous ?',
      merci: 'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions. Bonne journée ! 😊',
      médecin: 'Nous avons des médecins spécialistes en cardiologie, pédiatrie, gynécologie, dermatologie et ophtalmologie. Lequel souhaitez-vous consulter ?',
      contact: '📞 +237 6 99 88 77 66\n📧 contact@angelo-clinic.cm\n📍 Quartier Logpom, Douala'
    })

function getResponse(text) {
  const lower = text.toLowerCase()
  for (const [key, val] of Object.entries(responses.value)) {
    if (lower.includes(key)) return val
  }
  return t('chat.fallback')
}

async function send(preset = null) {
  const text = preset || inputText.value.trim()
  if (!text) return

  messages.value.push({ from: 'user', text })
  inputText.value = ''
  await scrollBottom()

  isTyping.value = true
  await scrollBottom()

  setTimeout(async () => {
    isTyping.value = false
    messages.value.push({ from: 'bot', text: getResponse(text) })
    await scrollBottom()
  }, 700)
}

async function scrollBottom() {
  await nextTick()
  if (chatContainer.value) chatContainer.value.scrollTop = chatContainer.value.scrollHeight
}

function toggleChat() {
  chatOpen.value = !chatOpen.value
  showBubble.value = false
  if (chatOpen.value) nextTick(() => scrollBottom())
}

// Afficher la bulle de bienvenue après 3s
onMounted(() => {
  setTimeout(() => { showBubble.value = true }, 3000)
  setTimeout(() => { showBubble.value = false }, 10000)
})

watch(locale, () => {
  if (messages.value.length <= 1) {
    messages.value = [{ from: 'bot', text: t('chat.welcome') }]
  }
})
</script>

<style scoped>
.chat-enter-active, .chat-leave-active { transition: all 0.3s ease; }
.chat-enter-from, .chat-leave-to { opacity: 0; transform: scale(0.95) translateY(10px); }
@media (max-width: 639px) {
  .chat-enter-from, .chat-leave-to { transform: translateY(100%); opacity: 1; }
}
.bubble-enter-active, .bubble-leave-active { transition: all 0.3s ease; }
.bubble-enter-from, .bubble-leave-to { opacity: 0; transform: translateY(8px) scale(0.95); }
@keyframes fadein { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.animate-fadein { animation: fadein 0.25s ease; }
</style>
