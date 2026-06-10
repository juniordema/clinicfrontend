

const BASE_URL = 'http://localhost:3000/api'

export function useApi() {
  function getToken() {
    return localStorage.getItem('angelo_token')
  }

  async function request(method, endpoint, body = null) {
    const headers = { 'Content-Type': 'application/json' }
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`

    const options = { method, headers }
    if (body) options.body = JSON.stringify(body)

    const res = await fetch(`${BASE_URL}${endpoint}`, options)
    const data = await res.json()

    if (!res.ok) throw new Error(data.error || 'Une erreur est survenue.')
    return data
  }

  return {
    get:    (ep)       => request('GET',    ep),
    post:   (ep, body) => request('POST',   ep, body),
    patch:  (ep, body) => request('PATCH',  ep, body),
    delete: (ep)       => request('DELETE', ep),
  }
}
