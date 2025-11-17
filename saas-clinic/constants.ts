// Theme colors
export const COLORS = {
  primary: {
    main: "#1E88E5",
    dark: "#0D47A1",
    light: "#BBDEFB",
  },
  gray: {
    light: "#F5F5F5",
    dark: "#424242",
  },
  teal: {
    main: "#14b8a6",
    dark: "#0f766e",
    light: "#5eead4",
  },
  cyan: {
    main: "#06b6d4",
    dark: "#0e7490",
  },
  purple: {
    main: "#9333ea",
    dark: "#6b21a8",
  },
  white: "#ffffff",
  background: "#f3f7f6",
} as const;

// User roles
export const USER_ROLES = {
  PLATFORM_ADMIN: "Admin",
  CLINIC_MANAGER: "Manager",
  DOCTOR: "Doctor",
  SECRETARY: "Secretary",
  PATIENT: "Patient",
} as const;

// Dashboard routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  JOIN_US: "/joinUs",
  PLATFORM_DASHBOARD: "/platform/dashboard",
  CLINIC_DASHBOARD: "/clinic/dashboard",
  DOCTOR_DASHBOARD: "/doctor/dashboard",
  RECEPTION_DASHBOARD: "/reception/dashboard",
  PATIENT_DASHBOARD: "/patient/dashboard",
} as const;

// API endpoints (if needed centrally)
export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  VERIFY_TOKEN: "/auth/verify",
  REFRESH_TOKEN: "/auth/refresh",
  PROFILE: "/auth/profile",
} as const;

// Common text translations
export const TRANSLATIONS = {
  en: {
    welcome: "Welcome",
    logout: "Logout",
    loading: "Loading",
    error: "Error",
    success: "Success",
  },
  ar: {
    welcome: "مرحباً",
    logout: "تسجيل خروج",
    loading: "جاري التحميل",
    error: "خطأ",
    success: "نجح",
  },
} as const;

// Common styles (can be used with cn() utility)
export const COMMON_STYLES = {
  card: "bg-white rounded-lg shadow p-6",
  cardHover: "bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer",
  gradientBanner: "bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg p-6 text-white",
  button: {
    primary: "px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors",
    secondary: "px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors",
    danger: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors",
  },
  input: "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500",
} as const;
