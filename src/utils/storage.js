/**
 * LocalStorage Persistence and State Rehydration Utility for GRANTLY
 */

import { INITIAL_DEMO_USER, INITIAL_SAVED_SCHOLARSHIPS, INITIAL_APPLICATIONS, INITIAL_DOCUMENTS, INITIAL_PLANNER_TASKS, INITIAL_NOTIFICATIONS } from "../data/demoUser";

const KEYS = {
  USER: "grantly_user_profile",
  AUTH: "grantly_demo_auth",
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
      return data ? JSON.parse(data) : fallback;
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

  resetToDemo() {
    this.set(KEYS.USER, INITIAL_DEMO_USER);
    this.set(KEYS.AUTH, { isAuthenticated: true, user: INITIAL_DEMO_USER });
    this.set(KEYS.SAVED, INITIAL_SAVED_SCHOLARSHIPS);
    this.set(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    this.set(KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
    this.set(KEYS.TASKS, INITIAL_PLANNER_TASKS);
    this.set(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    this.set(KEYS.COMPARE, ["sch-001", "sch-002", "sch-007"]);
  },

  clearAll() {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  },

  KEYS
};
