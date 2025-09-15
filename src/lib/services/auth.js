// Authentication service for handling login, logout, and token management
import { browser } from "$app/environment"

// In a real app, this would be your backend API URL
const API_BASE_URL = "http://localhost:8080"

// Get the auth token from localStorage
export function getAuthToken() {
  if (!browser) return null
  return localStorage.getItem("auth_token")
}

// Set the auth token in localStorage
export function setAuthToken(token) {
  if (!browser) return
  localStorage.setItem("auth_token", token)
}

// Remove the auth token from localStorage
export function removeAuthToken() {
  if (!browser) return
  localStorage.removeItem("auth_token")
}

// Check if the user is authenticated
export function isAuthenticated() {
  const token = getAuthToken()
  return !!token
}

// Login function
export async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || "Login failed")
    }

    const data = await response.json()
    setAuthToken(data.token)
    return data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

// Logout function
export function logout() {
  removeAuthToken()
}

// Get user info
export async function getUserInfo() {
  const token = getAuthToken()
  if (!token) {
    throw new Error("Not authenticated")
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token is invalid, remove it
        removeAuthToken()
      }
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || "Failed to fetch user info")
    }

    return await response.json()
  } catch (error) {
    console.error("Get user info error:", error)
    throw error
  }
}
