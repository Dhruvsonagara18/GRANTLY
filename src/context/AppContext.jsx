import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import { INITIAL_USER_PROFILE, INITIAL_SAVED_SCHOLARSHIPS, INITIAL_APPLICATIONS, INITIAL_DOCUMENTS, INITIAL_PLANNER_TASKS, INITIAL_NOTIFICATIONS } from '../data/demoUser';
import { Storage } from '../utils/storage';
import { calculateEligibility, calculateReadinessScore } from '../utils/eligibility';
import { getDeadlineInfo } from '../utils/deadline';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme State: 'light' or 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = Storage.get(Storage.KEYS.THEME, null);
    if (savedTheme) return savedTheme;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Apply theme to <html> element
  useEffect(() => {
    Storage.set(Storage.KEYS.THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // 1. Auth & User Profile State (Default: Dhruv Sonagara, Dwarka, Gujarat)
  const [user, setUser] = useState(() => {
    return Storage.get(Storage.KEYS.USER, INITIAL_USER_PROFILE);
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const auth = Storage.get(Storage.KEYS.AUTH, { isAuthenticated: true });
    return auth?.isAuthenticated ?? true;
  });

  // 2. Saved Scholarships (IDs)
  const [savedIds, setSavedIds] = useState(() => {
    return Storage.get(Storage.KEYS.SAVED, INITIAL_SAVED_SCHOLARSHIPS);
  });

  // 3. Applications Pipeline
  const [applications, setApplications] = useState(() => {
    return Storage.get(Storage.KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  });

  // 4. Documents Readiness
  const [documents, setDocuments] = useState(() => {
    return Storage.get(Storage.KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
  });

  // 5. Planner Tasks
  const [tasks, setTasks] = useState(() => {
    return Storage.get(Storage.KEYS.TASKS, INITIAL_PLANNER_TASKS);
  });

  // 6. Notifications
  const [notifications, setNotifications] = useState(() => {
    return Storage.get(Storage.KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  });

  // 7. Comparison List (max 3 items)
  const [compareIds, setCompareIds] = useState(() => {
    return Storage.get(Storage.KEYS.COMPARE, ["sch-004", "sch-001", "sch-002"]);
  });

  // 8. Quiz Results
  const [quizResults, setQuizResults] = useState(() => {
    return Storage.get(Storage.KEYS.QUIZ, null);
  });

  // Sync state changes with Storage
  useEffect(() => {
    Storage.set(Storage.KEYS.USER, user);
  }, [user]);

  useEffect(() => {
    Storage.set(Storage.KEYS.AUTH, { isAuthenticated, user });
  }, [isAuthenticated, user]);

  useEffect(() => {
    Storage.set(Storage.KEYS.SAVED, savedIds);
  }, [savedIds]);

  useEffect(() => {
    Storage.set(Storage.KEYS.APPLICATIONS, applications);
  }, [applications]);

  useEffect(() => {
    Storage.set(Storage.KEYS.DOCUMENTS, documents);
  }, [documents]);

  useEffect(() => {
    Storage.set(Storage.KEYS.TASKS, tasks);
  }, [tasks]);

  useEffect(() => {
    Storage.set(Storage.KEYS.NOTIFICATIONS, notifications);
  }, [notifications]);

  useEffect(() => {
    Storage.set(Storage.KEYS.COMPARE, compareIds);
  }, [compareIds]);

  useEffect(() => {
    if (quizResults) Storage.set(Storage.KEYS.QUIZ, quizResults);
  }, [quizResults]);

  // Auth actions
  const login = (email, password) => {
    setIsAuthenticated(true);
    return true;
  };

  const loginDemo = () => {
    setUser(INITIAL_USER_PROFILE);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    Storage.set(Storage.KEYS.AUTH, { isAuthenticated: false });
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({
      ...prev,
      ...updatedFields,
      education: { ...prev.education, ...updatedFields.education },
      academics: { ...prev.academics, ...updatedFields.academics },
      financial: { ...prev.financial, ...updatedFields.financial },
      preferences: { ...prev.preferences, ...updatedFields.preferences }
    }));
  };

  // Profile picture management
  const uploadProfilePicture = (base64Image) => {
    setUser(prev => ({
      ...prev,
      avatar: base64Image
    }));
  };

  const removeProfilePicture = () => {
    setUser(prev => ({
      ...prev,
      avatar: null
    }));
  };

  // Saved actions
  const toggleSaveScholarship = (id) => {
    setSavedIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter(x => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isSaved = (id) => savedIds.includes(id);

  // Application actions
  const addApplication = (scholarship, customStatus = "Interested", notes = "") => {
    const existing = applications.find(a => a.scholarshipId === scholarship.id);
    if (existing) {
      updateApplicationStatus(existing.id, customStatus);
      return existing;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      scholarshipId: scholarship.id,
      scholarshipTitle: scholarship.title,
      organization: scholarship.organization,
      awardAmount: scholarship.amount,
      amountValue: scholarship.amountValue,
      status: customStatus,
      appliedDate: customStatus === "Applied" ? new Date().toISOString().split("T")[0] : null,
      targetSubmitDate: scholarship.deadline,
      deadline: scholarship.deadline,
      notes: notes || `Tracked for ${scholarship.title}`,
      progressPercent: customStatus === "Interested" ? 25 : customStatus === "Preparing Documents" ? 65 : 100,
      timeline: [
        {
          date: new Date().toISOString().split("T")[0],
          title: "Added to Application Tracker",
          description: `Application initialized under status: ${customStatus}`
        }
      ]
    };

    setApplications(prev => [newApp, ...prev]);

    addNotification({
      type: "info",
      title: "Application Tracked",
      message: `Added ${scholarship.title} to your application journey.`,
      link: "/applications"
    });

    return newApp;
  };

  const updateApplicationStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const updatedTimeline = [
        ...(app.timeline || []),
        {
          date: new Date().toISOString().split("T")[0],
          title: `Status Changed to ${newStatus}`,
          description: `Updated status from ${app.status} to ${newStatus}`
        }
      ];

      let newProgress = 25;
      if (newStatus === "Preparing Documents") newProgress = 65;
      if (newStatus === "Applied") newProgress = 85;
      if (newStatus === "Under Review") newProgress = 90;
      if (newStatus === "Approved" || newStatus === "Rejected") newProgress = 100;

      return {
        ...app,
        status: newStatus,
        progressPercent: newProgress,
        appliedDate: newStatus === "Applied" && !app.appliedDate ? new Date().toISOString().split("T")[0] : app.appliedDate,
        timeline: updatedTimeline
      };
    }));
  };

  const updateApplicationNotes = (appId, notes) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, notes } : app));
  };

  const removeApplication = (appId) => {
    setApplications(prev => prev.filter(a => a.id !== appId));
  };

  // Document actions
  const updateDocumentStatus = (docId, newStatus) => {
    setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status: newStatus, lastUpdated: new Date().toISOString().split("T")[0] } : d));
  };

  const addDocument = (doc) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: doc.name,
      type: doc.type || "General",
      status: "Ready",
      lastUpdated: new Date().toISOString().split("T")[0],
      fileSize: "Uploaded (Verified locally)",
      notes: doc.notes || ""
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  // Task actions
  const addTask = (task) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: task.title,
      category: task.category || "General",
      relatedScholarshipId: task.relatedScholarshipId || null,
      relatedScholarshipTitle: task.relatedScholarshipTitle || null,
      dueDate: task.dueDate || new Date().toISOString().split("T")[0],
      completed: false,
      priority: task.priority || "Medium"
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Compare actions (up to 3 items)
  const addToCompare = (id) => {
    if (compareIds.includes(id)) return;
    if (compareIds.length >= 3) {
      setCompareIds(prev => [prev[1], prev[2], id]);
    } else {
      setCompareIds(prev => [...prev, id]);
    }
  };

  const removeFromCompare = (id) => {
    setCompareIds(prev => prev.filter(x => x !== id));
  };

  const isInCompare = (id) => compareIds.includes(id);

  const clearCompare = () => setCompareIds([]);

  // Notification actions
  const markAsRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = ({ type = "info", title, message, link = "" }) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      type,
      title,
      message,
      date: "Just now",
      read: false,
      link
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const resetDefaultProfile = () => {
    Storage.resetDefaultProfile();
    setUser(INITIAL_USER_PROFILE);
    setIsAuthenticated(true);
    setSavedIds(INITIAL_SAVED_SCHOLARSHIPS);
    setApplications(INITIAL_APPLICATIONS);
    setDocuments(INITIAL_DOCUMENTS);
    setTasks(INITIAL_PLANNER_TASKS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCompareIds(["sch-004", "sch-001", "sch-002"]);
  };

  // Alias for backward compatibility
  const resetDemo = resetDefaultProfile;

  // Computed Values with deterministic eligibility calculations
  const evaluatedScholarships = useMemo(() => {
    return SCHOLARSHIPS_DATA.map(sch => {
      const eligibility = calculateEligibility(sch, user);
      const deadlineInfo = getDeadlineInfo(sch.deadline);
      return {
        ...sch,
        eligibility,
        deadlineInfo
      };
    });
  }, [user]);

  // Total potential funding for all matching opportunities
  const totalPotentialFunding = useMemo(() => {
    return evaluatedScholarships
      .filter(s => s.eligibility.score >= 70 && !s.deadlineInfo.isClosed)
      .reduce((sum, s) => sum + (s.amountValue || 0), 0);
  }, [evaluatedScholarships]);

  // Readiness Score
  const readiness = useMemo(() => {
    return calculateReadinessScore(user, documents, applications);
  }, [user, documents, applications]);

  const unreadNotificationCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const value = {
    theme,
    toggleTheme,
    user,
    isAuthenticated,
    login,
    loginDemo,
    logout,
    updateUserProfile,
    uploadProfilePicture,
    removeProfilePicture,
    allScholarships: evaluatedScholarships,
    savedIds,
    toggleSaveScholarship,
    isSaved,
    applications,
    addApplication,
    updateApplicationStatus,
    updateApplicationNotes,
    removeApplication,
    documents,
    updateDocumentStatus,
    addDocument,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    compareIds,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare,
    notifications,
    markAsRead,
    markAllAsRead,
    addNotification,
    unreadNotificationCount,
    quizResults,
    setQuizResults,
    totalPotentialFunding,
    readiness,
    resetDefaultProfile,
    resetDemo
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
