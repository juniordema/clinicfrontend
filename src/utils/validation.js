/**
 * Fonctions de validation pour email et téléphone
 */

/**
 * Valide un email selon le format RFC 5322 simplifié
 * @param {string} email - L'email à valider
 * @returns {boolean} true si valide
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false
  
  // Expression régulière pour email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  // Vérifications supplémentaires
  if (!emailRegex.test(email)) return false
  if (email.length > 254) return false // RFC 5321
  if (email.startsWith('.') || email.endsWith('.')) return false
  if (email.includes('..')) return false
  
  const [localPart, domain] = email.split('@')
  if (localPart.length > 64) return false // RFC 5321
  if (domain.length < 3) return false
  
  return true
}

/**
 * Valide un numéro de téléphone camerounais
 * Formats acceptés:
 * - +237 6XX XX XX XX
 * - +2376XXXXXXXXX
 * - 06XX XX XX XX
 * - 0XXXXXXXXX
 * @param {string} phone - Le téléphone à valider
 * @returns {boolean} true si valide
 */
export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false
  
  // Nettoyer les espaces et caractères spéciaux
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  
  // Formats Cameroun (codes opérateurs: 6, 7, 68, 69, 70)
  // Formats acceptés:
  // +237XXXXXXXXX (12-13 chiffres au total)
  // 237XXXXXXXXX (11-12 chiffres)
  // 06XXXXXXXXX (10 chiffres, commence par 0)
  // 6XXXXXXXXX (9 chiffres, commence par 6)
  
  const cameroonPhoneRegex = /^(\+237|237|0)?[6789]\d{8}$/
  
  if (!cameroonPhoneRegex.test(cleaned)) return false
  
  // Vérifier la longueur finale (9-10 chiffres sans le +237 ou 0)
  const numberOnly = cleaned.replace(/^(\+237|237|0)/, '')
  if (numberOnly.length < 9 || numberOnly.length > 10) return false
  
  return true
}

/**
 * Formate un numéro de téléphone à l'affichage
 * +237 6 99 88 77 66
 * @param {string} phone - Le téléphone brut
 * @returns {string} Téléphone formaté
 */
export function formatPhoneDisplay(phone) {
  if (!phone || typeof phone !== 'string') return ''
  
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  
  // Convertir en format +237...
  let normalized = cleaned
  if (cleaned.startsWith('0') && !cleaned.startsWith('0237')) {
    normalized = '237' + cleaned.substring(1)
  } else if (!cleaned.startsWith('+') && !cleaned.startsWith('237')) {
    normalized = '237' + cleaned
  }
  
  // Retirer le +
  normalized = normalized.replace('+', '')
  
  // Formatter: 237 6 99 88 77 66
  if (normalized.length === 12) {
    return `+${normalized.slice(0, 3)} ${normalized.slice(3, 4)} ${normalized.slice(4, 6)} ${normalized.slice(6, 8)} ${normalized.slice(8, 10)} ${normalized.slice(10, 12)}`
  }
  
  return phone
}

/**
 * Normalise un numéro de téléphone pour stockage en BD
 * Retourne le format: +237XXXXXXXXX (12 chiffres)
 * @param {string} phone - Le téléphone à normaliser
 * @returns {string} Téléphone normalisé
 */
export function normalizePhone(phone) {
  if (!phone || typeof phone !== 'string') return ''
  
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  
  let normalized = cleaned
  
  // Convertir tous les formats en +237...
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    // 06XXXXXXXX → +237 6XXXXXXXX
    normalized = '237' + cleaned.substring(1)
  } else if (cleaned.startsWith('+237')) {
    normalized = cleaned.substring(1)
  } else if (cleaned.startsWith('237') && cleaned.length === 11) {
    normalized = cleaned
  } else if (!cleaned.startsWith('237') && cleaned.length === 9) {
    // 6XXXXXXXX → 237 6XXXXXXXX
    normalized = '237' + cleaned
  }
  
  return `+${normalized}`
}

/**
 * Récupère le message d'erreur pour email
 * @param {string} email - L'email à valider
 * @returns {string|null} Message d'erreur ou null si valide
 */
export function getEmailError(email) {
  if (!email) return 'L\'email est requis'
  if (!email.includes('@')) return 'L\'email doit contenir un @'
  if (email.length > 254) return 'L\'email est trop long'
  if (!isValidEmail(email)) return 'Format d\'email invalide (ex: user@example.com)'
  return null
}

/**
 * Récupère le message d'erreur pour téléphone
 * @param {string} phone - Le téléphone à valider
 * @returns {string|null} Message d'erreur ou null si valide
 */
export function getPhoneError(phone) {
  if (!phone) return 'Le téléphone est requis'
  
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  if (cleaned.length < 9) return 'Le numéro est trop court'
  if (cleaned.length > 13) return 'Le numéro est trop long'
  
  if (!isValidPhone(phone)) {
    return 'Format invalide. Utilisez: +237 6XX XX XX XX ou 06XX XX XX XX'
  }
  
  return null
}
