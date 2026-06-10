import { ref, reactive, nextTick } from 'vue'

const chatOpen = ref(false)
const chatInput = ref('')
const chatContainer = ref(null)
const chatMessages = reactive([
  { from: 'bot', text: 'Bonjour ! Bienvenue au Centre Médical Harmony. Comment puis-je vous aider ?' }
])

const chatSuggestions = ['Horaires', 'Adresse', 'Urgences', 'Tarifs', 'Services']

const chatResponses = {
  'rendez-vous': "Pour prendre rendez-vous, cliquez sur \"Prendre Rendez-vous\" dans le menu. Vous pourrez choisir votre spécialité, votre médecin et un créneau horaire. La réservation ne prend que 2 minutes !",
  'horaire': "Nous sommes ouverts du lundi au samedi de 7h30 à 18h00. Le service d'urgences est accessible 24h/24, 7j/7.",
  'adresse': "Centre Médical Angelo — Quartier Logpom,en face, Douala, Cameroun. Nous sommes facilement accessibles en taxi ou en voiture.",
  'urgence': "En cas d'urgence, appelez immédiatement le +237 6 99 88 77 66 ou présentez-vous directement à notre service d'urgences, ouvert 24h/24.",
  'prix': "Les consultations générales commencent à partir de 5 000 FCFA. Les tarifs varient selon la spécialité et les examens requis. Contactez-nous pour un devis détaillé.",
  'tarif': "Les consultations générales commencent à partir de 5 000 FCFA. Les tarifs varient selon la spécialité et les examens requis. Contactez-nous pour un devis détaillé.",
  'service': "Nous proposons : Consultation Générale, Cardiologie, Pédiatrie, Gynécologie-Obstétrique, Dermatologie, Ophtalmologie, Laboratoire d'analyses, Imagerie médicale, Urgences 24h/24 et Vaccination.",
  'bonjour': "Bonjour ! Comment puis-je vous aider aujourd'hui ? N'hésitez pas à poser votre question.",
  'salut': "Salut ! Bienvenue au Centre Médical Harmony. Que puis-je faire pour vous ?",
  'merci': "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Bonne journée !",
  'oui': "Très bien ! N'hésitez pas à me poser votre question.",
}

export function useChat() {
  function sendChatMessage(preset) {
    const text = preset || chatInput.value.trim()
    if (!text) return
    chatMessages.push({ from: 'user', text })
    chatInput.value = ''

    setTimeout(() => {
      const lower = text.toLowerCase()
      let response = "Je ne suis pas sûr de comprendre. Vous pouvez me poser des questions sur nos horaires, notre adresse, nos services, nos tarifs ou les urgences."
      for (const [key, val] of Object.entries(chatResponses)) {
        if (lower.includes(key)) { response = val; break }
      }
      chatMessages.push({ from: 'bot', text: response })
      nextTick(() => {
        if (chatContainer.value) chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      })
    }, 600)

    nextTick(() => {
      if (chatContainer.value) chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    })
  }

  return { chatOpen, chatInput, chatContainer, chatMessages, chatSuggestions, sendChatMessage }
}
