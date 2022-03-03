export const ACCESS_POLICY_SUCCESS = "ACCESS_POLICY_SUCCESS";
export const ACCESS_POLICY_CANCEL = "ACCESS_POLICY_CANCEL";

export function accessPolicy() {
  return {
    type: ACCESS_POLICY_SUCCESS,
    payload: true
  };
}

export function cancelPolicy() {
  return {
    type: ACCESS_POLICY_CANCEL,
    payload: false
  };
}
