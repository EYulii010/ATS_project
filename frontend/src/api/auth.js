const BASE = `${import.meta.env.VITE_AUTH_SERVICE_URL}/api/v1/auth`

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || data.error || "Error del servidor")
  return data
}

export async function login(email, password) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export async function registerApplicant({ email, password, first_name, last_name }) {
  return request("/register", {
    method: "POST",
    body: JSON.stringify({ email, password, first_name, last_name, law_787_accepted: true }),
  })
}

export async function registerOrganization({ businessName, RUC, adminEmail, first_name, last_name, password }) {
  return request("/organizations/register", {
    method: "POST",
    body: JSON.stringify({ businessName, RUC, adminEmail, first_name, last_name, password, law_787_accepted: true }),
  })
}

export async function getMe(token) {
  return request("/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function logoutApi(token) {
  return request("/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  })
}
