const USER_KEY = "user";

export function setUser(data) {
  sessionStorage.setItem(USER_KEY, JSON.stringify(data));
}

export function getUser() {
  const data = sessionStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function removeUser() {
  sessionStorage.removeItem(USER_KEY);
}
