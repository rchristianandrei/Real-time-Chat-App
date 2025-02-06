const host = "http://localhost:3000/api/chat";

function getAllChat() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const header = user
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      }
    : {
        "Content-Type": "application/json",
      };

  return fetch(`${host}/`, {
    method: "GET",
    headers: header,
  });
}

export default { getAllChat };
