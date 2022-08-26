import {SERVER_DOMAIN} from "../../env.js";

// Websocket client for the chat application
export default class ChatSocket {
  constructor(user1Id, user2Id) {
    this.connect(user1Id, user2Id);
    this.onMessageReceivedCallback = () => {};
  }

  connect(user1Id, user2Id) {
    this.socket = new WebSocket(`ws://${SERVER_DOMAIN}/ws/chat/${user1Id}/${user2Id}/`);
    this.socket.onopen = this.#onSocketOpen.bind(this);
    this.socket.onmessage = this.#onSocketMessage.bind(this);
    this.socket.onerror = this.#onSocketError.bind(this);
    this.socket.onclose = this.#onSocketClose.bind(this);
  }

  sendMessage(text) {
    this.socket.send(JSON.stringify({text}));
  }

  onMessageReceived(callback) {
    this.onMessageReceivedCallback = callback;
  }

  #onSocketOpen() {
    console.log('Socket opened');
  }
  #onSocketMessage(event) {
    console.log('Socket message', event.data);
    this.onMessageReceivedCallback(JSON.parse(event.data));
  }
  #onSocketError(event) {
    console.log('Socket error', event);
  }
  #onSocketClose(event) {
    console.log('Socket closed', event);
  }
}