"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  age?: number
  location?: string
  userType: "user" | "doctor"
  specialization?: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isDoctorOnboarded: boolean
  login: (user: User) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
  completeDoctorOnboarding: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDoctorOnboarded, setIsDoctorOnboarded] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsLoggedIn(true)

      // Check doctor onboarding status
      if (userData.userType === "doctor") {
        const verification = localStorage.getItem("doctorVerification")
        setIsDoctorOnboarded(!!verification)
      }
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem("currentUser", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    setIsDoctorOnboarded(false)
    localStorage.removeItem("currentUser")
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    }
  }

  const completeDoctorOnboarding = () => {
    setIsDoctorOnboarded(true)
  }

  return <AuthContext.Provider value={{ user, isLoggedIn, isDoctorOnboarded, login, logout, updateUser, completeDoctorOnboarding }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
