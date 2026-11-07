/**
 * LocalStorage Persistence and State Rehydration Utility for GRANTLY
 */

import { INITIAL_USER_PROFILE, INITIAL_SAVED_SCHOLARSHIPS, INITIAL_APPLICATIONS, INITIAL_DOCUMENTS, INITIAL_PLANNER_TASKS, INITIAL_NOTIFICATIONS } from "../data/demoUser";

const KEYS = {
  USER: "grantly_user_profile",
  AUTH: "grantly_auth",
  THEME: "grantly_theme",
  SAVED: "grantly_saved_scholarships",
  APPLICATIONS: "grantly_applications",
  DOCUMENTS: "grantly_documents",
  TASKS: "grantly_planner_tasks",
  NOTIFICATIONS: "grantly_notifications",
  COMPARE: "grantly_compare_list",
  QUIZ: "grantly_quiz_results"
};

export const Storage = {
  get(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      if (!data) return fallback;
      const parsed = JSON.parse(data);

      // Automatic migration to default user Dhruv Sonagara if prior test user was stored
      if (key === KEYS.USER && parsed && (parsed.name === "Aarav Sharma" || !parsed.city || parsed.city !== "Dwarka")) {
        return {
          ...INITIAL_USER_PROFILE,
          ...parsed,
          name: "Dhruv Sonagara",
          city: "Dwarka",
          state: "Gujarat",
          country: "India"
        };
      }

      return parsed;
    } catch (e) {
      console.warn(`Error reading key ${key} from localStorage:`, e);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error writing key ${key} to localStorage:`, e);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Error removing key ${key} from localStorage:`, e);
    }
  },

  resetDefaultProfile() {
    this.set(KEYS.USER, INITIAL_USER_PROFILE);
    this.set(KEYS.AUTH, { isAuthenticated: true, user: INITIAL_USER_PROFILE });
    this.set(KEYS.SAVED, INITIAL_SAVED_SCHOLARSHIPS);
    this.set(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    this.set(KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
    this.set(KEYS.TASKS, INITIAL_PLANNER_TASKS);
    this.set(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    this.set(KEYS.COMPARE, ["sch-004", "sch-001", "sch-002"]);
  },

  clearAll() {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  },

  KEYS
};
