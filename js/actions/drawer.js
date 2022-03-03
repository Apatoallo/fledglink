export const OPEN_DRAWER = "OPEN_DRAWER";
export const CLOSE_DRAWER = "CLOSE_DRAWER";
export const CHANGE_ROUTE = "CHANGE_ROUTE";

export function openDrawer() {
  return {
    type: OPEN_DRAWER
  };
}

export function closeDrawer() {
  return {
    type: CLOSE_DRAWER
  };
}

export function changeInitialRoute(route) {
  return {
    type: CHANGE_ROUTE,
    payload: route
  };
}
