export const INCREMENT_LOGIN_COUNT = "INCREMENT_LOGIN_COUNT";
export const TRACK_ONBOARDING_COMPELTE = "TRACK_ONBOARDING_COMPELTE";
export const TRACK_OPPORTUNITY_APPLICATION = "TRACK_OPPORTUNITY_APPLICATION";
export const TRACK_EVENT_VIEW = "TRACK_EVENT_VIEW";
export const TRACK_EVENT_ATTENDANCE = "TRACK_EVENT_ATTENDANCE";
export const TRACK_NEWS_FEED_INTERACTION = "TRACK_NEWS_FEED_INTERACTION";
export const TRACK_QUALITY_REFERRAL = "TRACK_QUALITY_REFERRAL";
export const TRACK_RESOURCE_VIEW = "TRACK_RESOURCE_VIEW";
export const TRACK_QUESTIONNAIRE_INTERACTION =
  "TRACK_QUESTIONNAIRE_INTERACTION";
export const TRACK_QUESTIONNAIRE_COMMENCE = "TRACK_QUESTIONNAIRE_COMMENCE";
export const TRACK_PRACTICE_TEST_INTERACTION =
  "TRACK_PRACTICE_TEST_INTERACTION";
export const TRACK_ASSESSMENT_INTERACTION = "TRACK_ASSESSMENT_INTERACTION";
export const TRACK_UPDATE_DASHBOARD_SECTOR = "TRACK_UPDATE_DASHBOARD_SECTOR";
export const TRACK_UPDATE_DASHBOARD_COMPANY = "TRACK_UPDATE_DASHBOARD_COMPANY";
export const TRACK_UPDATE_DASHBOARD_JOB_TYPE =
  "TRACK_UPDATE_DASHBOARD_JOB_TYPE";
export const TRACK_UPDATE_DASHBOARD_JOB_INTEREST =
  "TRACK_UPDATE_DASHBOARD_JOB_INTEREST";
export const TRACK_UPDATE_DASHBOARD_JOB_HUNT_STATUS =
  "TRACK_UPDATE_DASHBOARD_JOB_HUNT_STATUS";
export const TRACK_NEWS_FEEDS = "TRACK_NEWS_FEEDS";
export const TRACK_WORK_EXPERIENCE_ADDED = "TRACK_WORK_EXPERIENCE_ADDED";
export const TRACK_WORK_EXPERIENCE_UPDATED = "TRACK_WORK_EXPERIENCE_UPDATED";
export const TRACK_EDUCATION_ADDED = "TRACK_EDUCATION_ADDED";
export const TRACK_EDUCATION_UPDATED = "TRACK_EDUCATION_UPDATED";

export function incrementLoginCount() {
  return {
    type: INCREMENT_LOGIN_COUNT
  };
}

export function trackOnboardingCompletion(payload) {
  return {
    type: TRACK_ONBOARDING_COMPELTE,
    payload
  };
}

export function trackOpportunityApplication(opportunity) {
  return {
    type: TRACK_OPPORTUNITY_APPLICATION,
    payload: opportunity
  };
}

export function trackEventView(event) {
  return {
    type: TRACK_EVENT_VIEW,
    payload: event
  };
}

export function trackEventAttendance(event) {
  return {
    type: TRACK_EVENT_ATTENDANCE,
    payload: event
  };
}

export function trackNewsItemInteraction(key, payload) {
  return {
    type: TRACK_NEWS_FEED_INTERACTION,
    key,
    payload
  };
}

export function trackQualityReferral() {
  return {
    type: TRACK_QUALITY_REFERRAL
  };
}

export function trackResourceView(resource) {
  return {
    type: TRACK_RESOURCE_VIEW,
    payload: resource
  };
}

export function trackQuestionnaireInteraction() {
  return {
    type: TRACK_QUESTIONNAIRE_INTERACTION
  };
}

export function trackQuestionnaireCommence() {
  return {
    type: TRACK_QUESTIONNAIRE_COMMENCE
  };
}

export function trackPracticeTestInteraction() {
  return {
    type: TRACK_PRACTICE_TEST_INTERACTION
  };
}

export function trackAssessmentInteraction() {
  return {
    type: TRACK_ASSESSMENT_INTERACTION
  };
}

export function trackUpdateDashboardSector(payload) {
  return {
    type: TRACK_UPDATE_DASHBOARD_SECTOR,
    payload
  };
}

export function trackUpdateDashboardCompany(payload) {
  return {
    type: TRACK_UPDATE_DASHBOARD_COMPANY,
    payload
  };
}

export function trackUpdateDashboardJobType(payload) {
  return {
    type: TRACK_UPDATE_DASHBOARD_JOB_TYPE,
    payload
  };
}

export function trackUpdateDashboardJobInterest(payload) {
  return {
    type: TRACK_UPDATE_DASHBOARD_JOB_INTEREST,
    payload
  };
}

export function trackUpdateDashboardJobHuntStatus(payload) {
  return {
    type: TRACK_UPDATE_DASHBOARD_JOB_HUNT_STATUS,
    payload
  };
}

export function trackNewsFeeds(payload) {
  return {
    type: TRACK_NEWS_FEEDS,
    payload
  };
}

export function trackWorkExperienceAdded(payload) {
  return {
    type: TRACK_WORK_EXPERIENCE_ADDED,
    payload
  };
}

export function trackWorkExperienceUpdated(payload) {
  return {
    type: TRACK_WORK_EXPERIENCE_UPDATED,
    payload
  };
}

export function trackEducationAdded(payload) {
  return {
    type: TRACK_EDUCATION_ADDED,
    payload
  };
}

export function trackEducationUpdated(payload) {
  return {
    type: TRACK_EDUCATION_UPDATED,
    payload
  };
}
