export const ME_FETCH_START = 'ME_FETCH_START';
export const ME_FETCH_SUCCESS = 'ME_FETCH_SUCCESS';
export const ME_FETCH_ERROR = 'ME_FETCH_ERROR';


export function fetchLoggedInUser(hanfordId) {
  return { type: ME_FETCH_START, hid: hanfordId };
}
