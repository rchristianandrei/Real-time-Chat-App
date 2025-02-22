const host = `${import.meta.env.VITE_APP_API_ENPOINT}/auth`;

export function login(username, password) {
  return fetch(`${host}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
}

export function register(username, displayName, password) {
  return fetch(`${host}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      displayName: displayName,
      password: password,
    }),
  });
}

export default { login, register };
