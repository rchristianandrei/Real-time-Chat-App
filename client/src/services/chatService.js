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

function getAllMessages(chatId) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const header = user
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      }
    : {
        "Content-Type": "application/json",
      };

  return fetch(`${host}/messages/${chatId}`, {
    method: "GET",
    headers: header,
  });
}

function sendMessage(chatId, recepientId, message) {
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
    method: "POST",
    headers: header,
    body: JSON.stringify({
      chatId: chatId,
      recepientId: recepientId,
      message: message,
    }),
  });
}

export default { getAllChat, getAllMessages, sendMessage };
