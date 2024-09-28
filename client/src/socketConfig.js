import io from "socket.io-client";
// const url = "http://localhost:5000"
const url = "https://tallytyperacer.onrender.com";

const socket = io(url);
export default socket;
