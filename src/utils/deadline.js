/**
 * Real Date Calculation & Deadline Intelligence Utility for GRANTLY
 * Categorizes deadlines according to Section 13:
 * - URGENT: Within 3 days
 * - UPCOMING: Within 7 days
 * - LATER: More than 7 days
 * - CLOSED: Past deadline
 */

export function getDeadlineInfo(deadlineDateString, referenceDate = new Date("2026-11-07T12:00:00Z")) {
  if (!deadlineDateString) {
    return {
      daysRemaining: 0,
      hoursRemaining: 0,
      status: "unknown",
      category: "UNKNOWN",
      badgeColor: "gray",
      label: "No Deadline Specified",
      formattedDate: "Ongoing"
    };
  }

  const target = new Date(deadlineDateString);
  const now = referenceDate;
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60)));

  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = target.toLocaleDateString("en-IN", options);

  if (diffTime < 0) {
    return {
      daysRemaining: diffDays,
      hoursRemaining: 0,
      status: "closed",
      category: "CLOSED",
      badgeColor: "gray",
      label: "Application Closed",
      formattedDate,
      isClosed: true,
      isUrgent: false
    };
  }

  if (diffDays <= 3) {
    return {
      daysRemaining: diffDays,
      hoursRemaining: diffHours,
      status: "urgent",
      category: "URGENT",
      badgeColor: "rose",
      label: diffDays === 1 ? "Closing Tomorrow!" : `Closes in ${diffDays} days!`,
      formattedDate,
      isClosed: false,
      isUrgent: true
    };
  }

  if (diffDays <= 7) {
    return {
      daysRemaining: diffDays,
      hoursRemaining: diffHours,
      status: "upcoming",
      category: "UPCOMING",
      badgeColor: "amber",
      label: `Closes in ${diffDays} days`,
      formattedDate,
      isClosed: false,
      isUrgent: false
    };
  }

  return {
    daysRemaining: diffDays,
    hoursRemaining: diffHours,
    status: "later",
    category: "LATER",
    badgeColor: "indigo",
    label: `${diffDays} days remaining`,
    formattedDate,
    isClosed: false,
    isUrgent: false
  };
}

/**
 * Groups scholarships into the 4 official categories
 */
export function groupScholarshipsByDeadline(scholarships) {
  const grouped = {
    urgent: [],
    upcoming: [],
    later: [],
    closed: []
  };

  scholarships.forEach(s => {
    const info = getDeadlineInfo(s.deadline);
    if (info.status === "urgent") grouped.urgent.push({ ...s, deadlineInfo: info });
    else if (info.status === "upcoming") grouped.upcoming.push({ ...s, deadlineInfo: info });
    else if (info.status === "closed") grouped.closed.push({ ...s, deadlineInfo: info });
    else grouped.later.push({ ...s, deadlineInfo: info });
  });

  return grouped;
}
