let ws = null;
let delegates = [];

export function connectToWSS(token) {
  if (ws) return;
  ws = new WebSocket(`${import.meta.env.VITE_APP_WS_ENPOINT}?token=${token}`);

  ws.addEventListener("message", (ev) => {
    delegates.forEach((element) => {
      element(JSON.parse(ev.data));
    });
  });
}

export function disconnectToWSS() {
  ws?.close();
  ws = null;
}

export function subscribeToMessage(item) {
  delegates.push(item);
}

export function unsubscribeToMessage(item) {
  delegates = delegates.filter((v) => v !== item);
}
