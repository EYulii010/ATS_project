import { createContext, useState, useContext, useEffect } from "react"
import { getMe, logoutApi } from "@/api/auth"

const AuthContext = createContext()

const AVATAR_COLORS = {
  aplicante: "from-purple-500 to-purple-700",
  reclutador: "from-blue-500 to-blue-700",
  admin:      "from-blue-500 to-blue-700",
}

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("applik_token")
    if (!token) { setLoading(false); return }

    getMe(token)
      .then(({ data }) => {
        const role = parseRole(token)
        setUser({ ...data, role, avatar_color: AVATAR_COLORS[role] ?? AVATAR_COLORS.aplicante })
      })
      .catch(() => {
        localStorage.removeItem("applik_token")
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (tokenOrUser) => {
    // Dev login pasa un objeto de usuario directamente (sin backend)
    if (typeof tokenOrUser === "object") {
      setUser(tokenOrUser)
      return
    }
    localStorage.setItem("applik_token", tokenOrUser)
    const { data } = await getMe(tokenOrUser)
    const role = parseRole(tokenOrUser)
    setUser({ ...data, role, avatar_color: AVATAR_COLORS[role] ?? AVATAR_COLORS.aplicante })
  }

  const logout = async () => {
    const token = localStorage.getItem("applik_token")
    if (token) logoutApi(token).catch(() => {})
    localStorage.removeItem("applik_token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

function parseRole(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.role ?? "aplicante"
  } catch {
    return "aplicante"
  }
}
