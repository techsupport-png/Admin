const baseURL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api'

// Allow configuring credentials mode via VITE_FETCH_CREDENTIALS (e.g. 'include' | 'same-origin' | 'omit')
const credentialsMode = (import.meta.env.VITE_FETCH_CREDENTIALS as string) || 'same-origin'

function buildUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token')
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const url = buildUrl(path)

  // Helpful debug logging for development
  // eslint-disable-next-line no-console
  console.debug('[fetchClient] request', { method: options.method || 'GET', url, credentials: credentialsMode })

  let res: Response
  try {
    res = await fetch(url, { ...options, headers, credentials: credentialsMode as RequestCredentials })
  } catch (networkErr: any) {
    // Network-level error (DNS, CORS preflight failure, connection refused)
    // eslint-disable-next-line no-console
    console.error('[fetchClient] network error', networkErr)
    const err: any = new Error(`Network error when fetching ${url}: ${networkErr?.message || networkErr}`)
    err.original = networkErr
    throw err
  }

  // eslint-disable-next-line no-console
  console.debug('[fetchClient] response', { url, status: res.status, ok: res.ok })

  if (res.status === 401) {
    localStorage.removeItem('token')
    // redirect to login
    try {
      window.location.href = '/login'
    } catch (e) {
      // ignore in non-browser env
    }
    throw new Error('Unauthorized')
  }

  const text = await res.text()
  let data: any = null
  try {
    data = text ? JSON.parse(text) : null
  } catch (e) {
    data = text
  }

  if (!res.ok) {
    const message = data?.message || data?.error || res.statusText || 'Request failed'
    const err: any = new Error(message)
    err.status = res.status
    err.data = data
    // eslint-disable-next-line no-console
    console.error('[fetchClient] request failed', { url, status: res.status, body: data })
    throw err
  }

  return data
}

const fetchClient = {
  get: (path: string) => request(path, { method: 'GET' }),
  post: (path: string, body?: any) => request(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: (path: string, body?: any) => request(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: (path: string, body?: any) => request(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: (path: string) => request(path, { method: 'DELETE' }),
}

export default fetchClient
