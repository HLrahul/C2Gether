import fetch from "node-fetch";

const KEEP_ALIVE_URL = "https://c2gether-socket-server.onrender.com/";

export const keepAlive = (): void => {
  fetch(KEEP_ALIVE_URL)
    .then((res) => res.text())
    .then((body) => console.log(`Keep-alive ping successful: ${body}`))
    .catch((err) => console.error(`Keep-alive ping failed: ${err}`));
};

setInterval(keepAlive, 25 * 60 * 1000); // Ping every 25 minutes
