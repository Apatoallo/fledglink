import { serverUrl } from "../configs/config";
import {
  mapper,
  mapperSelect,
  mapperAcquaintanceSelect,
  mapperNotAcquaintanceSelect
} from "../utils/maper";

export const GET_USER_OPTIONS = "GET_USER_OPTIONS";
export const GET_USER_OPTIONS_SUCCESS = "GET_USER_OPTIONS_SUCCESS";
export const GET_USER_OPTIONS_FAIL = "GET_USER_OPTIONS_FAIL";

function getUserOptions(userOptions) {
  return {
    type: GET_USER_OPTIONS,
    payload: userOptions
  };
}

function getUserOptionsSuccess(userOptions) {
  return {
    type: GET_USER_OPTIONS_SUCCESS,
    payload: userOptions
  };
}

function getUserOptionsFail(error) {
  return {
    type: GET_USER_OPTIONS_FAIL,
    payload: error
  };
}

export function setUserOptions(token) {
  return dispatch => {
    dispatch(getUserOptions({}));
    fetch(`${serverUrl}/users/properties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => result.json())
      .then(result => {
        if (!result.message) {
          const userInfo = {
            occupationType: {
              apprentice: result.dynamicFields.oppType.ruleFieldOptions.apprentice.enum.map(
                mapper
              ),
              education: {
                school: result.dynamicFields.oppType.ruleFieldOptions[
                  "education_school"
                ].enum.map(mapper),
                university: result.dynamicFields.oppType.ruleFieldOptions[
                  "education_university"
                ].enum.map(mapper),
                college: result.dynamicFields.oppType.ruleFieldOptions[
                  "education_college"
                ].enum.map(mapper)
              },
              work: result.dynamicFields.oppType.ruleFieldOptions.work.enum.map(
                mapper
              )
            },
            companyType: result.companyType.map(mapper),
            education: result.education,
            qualities: result.qualities.map(mapper),
            eventTypes: result.eventTypes && result.eventTypes.map(mapper),
            ethnicity: result.ethnicity.map(mapperSelect),
            gender: result.gender.map(mapperSelect),
            disability: result.disability.map(mapperSelect),
            freeSchoolMeals: result.freeSchoolMeals.map(mapperSelect),
            iKnowYou: result.iKnowYou.map(mapperAcquaintanceSelect),
            iDontKnowYou: result.iDontKnowYou.map(mapperNotAcquaintanceSelect),
            jobHuntStatus: result.jobHuntStatus.map(mapperSelect),
            jobInterest: result.jobInterest.map(mapper),
            oppType: result.oppType.map(mapper),
            profileStatus: result.profileStatus.map(mapperSelect),
            sectorInterest: result.sectorInterest.map(mapper),
            salary: result.salary && result.salary.map(mapper),
            contractType:
              result.contractType && result.contractType.map(mapper),
            diversityLabels: result.diversityLabels.map(mapper),
            diversityValues: result.diversityValues.map(mapperSelect),
            newsChannels: result.newsChannels
          };
          dispatch(getUserOptionsSuccess(userInfo));
        } else {
          dispatch(getUserOptionsFail(result.message));
        }
      })
      .catch(error => console.log(error));
  };
}
