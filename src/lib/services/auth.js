// Authentication service for handling login, logout, and token management

const AUTH_TOKEN_KEY = 'auth_token';
const USER_INFO_KEY = 'user_info';

// Login function
export async function login(username, password) {
  try {
    const response = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Login failed");
    }

    const data = await response.json();
    
    // Store token and user info
    if (data.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    }
    if (data.user) {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(data.user));
    }
    
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Logout function
export async function logout() {
  try {
    await fetch(`/api/logout`, {
      method: "POST",
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Clear local storage regardless of API call success
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_INFO_KEY);
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  const token = getAuthToken();
  return !!token;
}

// Get authentication token
export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

// Get user information
export function getUserInfo() {
  const userInfo = localStorage.getItem(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
}
