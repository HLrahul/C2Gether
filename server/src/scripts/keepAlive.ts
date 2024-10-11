import https from "https";

const KEEP_ALIVE_URL = "https://c2gether-socket-server.onrender.com/";

export const keepAlive = (): void => {
  https
    .get(KEEP_ALIVE_URL, (res) => {
      let data = "";

      // A chunk of data has been received.
      res.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      res.on("end", () => {
        console.log(`Keep-alive ping successful: ${data}`);
      });
    })
    .on("error", (err) => {
      console.error(`Keep-alive ping failed: ${err.message}`);
    });
};

setInterval(keepAlive, 25 * 60 * 1000); // Ping every 25 minutes
