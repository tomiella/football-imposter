import io from "socket.io-client";
const API_URL = "https://socket.nidalee.party/";
let dev = true;
export const socket = io(dev ? "http://localhost:3001" : API_URL, {
  autoConnect: false,
  secure: true,
});
