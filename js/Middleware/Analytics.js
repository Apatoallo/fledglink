import FacebookAnalyticsManager from "../Services/FacebookAnalytics";
import FirebaseAnalyticsManager from "../Services/FirebaseAnalytics";
import MixpanelManager from "../Services/Mixpanel";

import { SET_USER } from "../actions/user";
import { GET_COMPANY_SUCCESS } from "../actions/company";
import { GET_EVENT_BY_ID_SUCCESS } from "../actions/events";
import {
  REGISTRATION_SUCCESS,
  SELECT_AVATAR
} from "../actions/register";
import { CREATE_PENDING_CONNECTION_REQUEST_SUCCESS } from "../actions/userActions";
import { GET_OPPORTUNITY_BY_ID } from "../actions/companyOpportunities";
import {
  INCREMENT_LOGIN_COUNT,
  TRACK_OPPORTUNITY_APPLICATION,
  TRACK_EVENT_VIEW,
  TRACK_EVENT_ATTENDANCE,
  TRACK_NEWS_FEED_INTERACTION,
  TRACK_QUALITY_REFERRAL,
  TRACK_RESOURCE_VIEW,
  TRACK_QUESTIONNAIRE_INTERACTION,
  TRACK_QUESTIONNAIRE_COMMENCE,
  TRACK_PRACTICE_TEST_INTERACTION,
  TRACK_ASSESSMENT_INTERACTION,
  TRACK_UPDATE_DASHBOARD_SECTOR,
  TRACK_UPDATE_DASHBOARD_COMPANY,
  TRACK_UPDATE_DASHBOARD_JOB_TYPE,
  TRACK_UPDATE_DASHBOARD_JOB_INTEREST,
  TRACK_UPDATE_DASHBOARD_JOB_HUNT_STATUS,
  TRACK_NEWS_FEEDS,
  TRACK_WORK_EXPERIENCE_ADDED,
  TRACK_WORK_EXPERIENCE_UPDATED,
  TRACK_EDUCATION_ADDED,
  TRACK_EDUCATION_UPDATED
} from "../actions/analytics";
import PushNotification from "../Services/PushNotification";

function registerPushToken() {
  PushNotification.getDeviceToken()
    .then(({ ios, android }) => {
      if (ios) {
        MixpanelManager.addPushDeviceToken(ios.token);
      } else if (android) {
        MixpanelManager.setPushRegistrationId(android.token);
      }
    })
    .catch(error => {
      console.error("PushNotification.getDeviceToken", error);
    });
}

export default store => next => action => {
  const result = next(action);

  switch (action.type) {
    case INCREMENT_LOGIN_COUNT: {
      MixpanelManager.increment("Login Count", 1);

      break;
    }

    case REGISTRATION_SUCCESS: {
      MixpanelManager.identify(result.payload.email);

      MixpanelManager.registerSuperProperties({
        Name: result.payload.fullName,
        Email: result.payload.email
      });

      MixpanelManager.set({
        $name: result.payload.fullName,
        $email: result.payload.email,
        "Referral Code": result.payload.referralCode,
        $created: result.payload.createdAt
      });

      MixpanelManager.track("Registration Successful");
      FirebaseAnalyticsManager.logEvent("registration_success");
      FacebookAnalyticsManager.logEvent("Registration Success");

      break;
    }

    case SET_USER: {
      MixpanelManager.identify(result.payload.email);

      MixpanelManager.set({
        $name: result.payload.fullName,
        $email: result.payload.email,
        $created: result.payload.createdAt,
        "Birth Date": result.payload.birthDate,
        $ethnicity: result.payload.ethnicity,
        $disability: result.payload.disability,
        $gender: result.payload.gender,
        "Home Location": result.payload.homeLocation,
        "Free School Meals": result.payload.freeSchoolMeals,
        "job type": result.payload.oppType,
        "job interest": result.payload.jobInterest,
        "Job search – Location": result.payload.jobLocations,
        "Job search – Remote": result.payload.remoteWorking,
        "job hunt status": result.payload.jobHuntStatus,
        "Total Connections": result.payload.connectionsCount,
        "Pending Connections": result.payload.connectionRequestsCount,
        "Profile Score": result.payload.profileScore
      });

      registerPushToken();

      break;
    }

    case SELECT_AVATAR: {
      MixpanelManager.track("Image upload");

      break;
    }

    case CREATE_PENDING_CONNECTION_REQUEST_SUCCESS: {
      MixpanelManager.trackWithProperties("Connection request sent", {
        user: result.payload,
        "date sent": new Date()
      });

      break;
    }

    case GET_OPPORTUNITY_BY_ID: {
      MixpanelManager.trackWithProperties("View Opportunity", {
        title: result.payload.jobTitle,
        type: result.payload.opportunityType,
        organisation: result.payload.corporation.baseInfo.name,
        industry: result.payload.corporation.industry,
        "company size": result.payload.corporation.companyType[0],
        saved: result.payload.isSaved,
        applied: result.payload.isApplied,
        priority: result.payload.priority
      });

      break;
    }

    case GET_COMPANY_SUCCESS: {
      MixpanelManager.trackWithProperties("View Organisation", {
        organisation: result.payload.baseInfo.name,
        badges: result.payload.badges.map(({ title }) => title),
        following: result.payload.isSubscribed,
        industry: result.payload.industry,
        "company size": result.payload.companyType[0]
      });

      break;
    }

    case TRACK_EVENT_VIEW:
    case GET_EVENT_BY_ID_SUCCESS: {
      MixpanelManager.trackWithProperties("View Event", {
        title: result.payload.title,
        location: result.payload.location.name,
        latitude: result.payload.location.geoposition[0],
        longitude: result.payload.location.geoposition[1],
        type: result.payload.eventTypes,
        attending: result.payload.isSubscribed
      });

      break;
    }

    case TRACK_OPPORTUNITY_APPLICATION: {
      MixpanelManager.trackWithProperties("Opportunity Application", {
        title: result.payload.jobTitle,
        type: result.payload.opportunityType,
        organisation: result.payload.corporation.baseInfo.name,
        industry: result.payload.corporation.industry,
        "company size": result.payload.corporation.companyType[0],
        saved: result.payload.isSaved,
        priority: result.payload.priority
      });

      break;
    }

    case TRACK_EVENT_ATTENDANCE: {
      MixpanelManager.trackWithProperties("Event Registration", {
        title: result.payload.title,
        location: result.payload.location.name,
        latitude: result.payload.location.geoposition[0],
        longitude: result.payload.location.geoposition[1],
        type: result.payload.eventTypes,
        attending: result.payload.isSubscribed
      });

      break;
    }

    case TRACK_NEWS_FEED_INTERACTION: {
      const data = (type => {
        switch (type) {
          case "resource":
            return {
              priority: result.payload.priority,
              channel: result.payload.channel,
              title: result.payload.title
            };
          case "event":
            return {
              title: result.payload.title
            };
          case "opportunity":
            return {
              title: result.payload.jobTitle,
              priority: result.payload.priority
            };
          default:
        }
      })(result.key);

      MixpanelManager.trackWithProperties("View News", {
        type: result.key,
        ...data
      });

      break;
    }

    case TRACK_QUALITY_REFERRAL: {
      MixpanelManager.track("Boost My Qualities Referral");

      break;
    }

    case TRACK_RESOURCE_VIEW: {
      MixpanelManager.trackWithProperties("View Resources", {
        title: result.payload.title,
        tags: result.payload.tags.map(({ name }) => name)
      });

      break;
    }

    case TRACK_QUESTIONNAIRE_INTERACTION: {
      MixpanelManager.track("Personality Questionnaire");

      break;
    }

    case TRACK_QUESTIONNAIRE_COMMENCE: {
      MixpanelManager.track("Personality Questionnaire Commence");

      break;
    }

    case TRACK_PRACTICE_TEST_INTERACTION: {
      MixpanelManager.track("Practice Test");

      break;
    }

    case TRACK_ASSESSMENT_INTERACTION: {
      MixpanelManager.track("Future Job Predictor");

      break;
    }

    case TRACK_UPDATE_DASHBOARD_SECTOR: {
      MixpanelManager.trackWithProperties("Update Dashboard Sector", {
        sector: result.payload
      });

      MixpanelManager.set({
        sector: result.payload
      });

      break;
    }

    case TRACK_UPDATE_DASHBOARD_COMPANY: {
      MixpanelManager.trackWithProperties("Update Dashboard Company", {
        company: result.payload
      });

      MixpanelManager.set({
        company: result.payload
      });

      break;
    }

    case TRACK_UPDATE_DASHBOARD_JOB_TYPE: {
      MixpanelManager.trackWithProperties("Update Dashboard Job Type", {
        type: result.payload
      });

      MixpanelManager.set({
        "job type": result.payload
      });

      break;
    }

    case TRACK_UPDATE_DASHBOARD_JOB_INTEREST: {
      MixpanelManager.trackWithProperties("Update Dashboard Job Interest", {
        interest: result.payload
      });

      MixpanelManager.set({
        "job interest": result.payload
      });

      break;
    }

    case TRACK_UPDATE_DASHBOARD_JOB_HUNT_STATUS: {
      MixpanelManager.trackWithProperties("Update Dashboard Job Status", {
        status: result.payload
      });

      MixpanelManager.set({
        "job hunt status": result.payload
      });

      break;
    }

    case TRACK_NEWS_FEEDS: {
      MixpanelManager.set({
        "Channel Preferences": result.payload
      });

      break;
    }

    case TRACK_WORK_EXPERIENCE_ADDED: {
      MixpanelManager.trackWithProperties("Work Experience Added", {
        work_experience_title: result.payload.title,
        work_experience_company: result.payload.company.name
      });

      break;
    }

    case TRACK_WORK_EXPERIENCE_UPDATED: {
      MixpanelManager.trackWithProperties("Work Experience Updated", {
        work_experience_title: result.payload.title,
        work_experience_company: result.payload.company.name
      });

      break;
    }

    case TRACK_EDUCATION_ADDED: {
      MixpanelManager.trackWithProperties("Education Added", {
        education_school_name: result.payload.name,
        education_studying: result.payload.studying,
        education_courses: result.payload.courses,
        education_grade: result.payload.grade
      });

      break;
    }

    case TRACK_EDUCATION_UPDATED: {
      MixpanelManager.trackWithProperties("Education Updated", {
        education_school_name: result.payload.name,
        education_studying: result.payload.studying,
        education_courses: result.payload.courses,
        education_grade: result.payload.grade
      });

      break;
    }
  }

  return result;
};
