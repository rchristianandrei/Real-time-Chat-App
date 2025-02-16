const host = `${import.meta.env.VITE_APP_API_ENPOINT}/users`;

export function findUsers(keyword) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const header = user
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      }
    : {
        "Content-Type": "application/json",
      };

  return fetch(`${host}/find/?keyword=${keyword}`, {
    method: "GET",
    headers: header,
  });
}

export default { findUsers };
