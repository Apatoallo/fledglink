export const TOGGLE_CHANNEL = "TOGGLE_CHANNEL";

export function toggleChannel(name) {
  return {
    type: TOGGLE_CHANNEL,
    payload: name
  };
}
