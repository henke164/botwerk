<script>
import { emitAppEvent } from "../../services/appEventHandler";

export default {
  data() {
    return {
      wsHost: "ws://localhost:3001/websockets?botwerk",
      isConnected: this.$root.botwerkWsConnection !== undefined,
    };
  },
  methods: {
    connectWs() {
      const connection = new WebSocket(this.wsHost);
      connection.onmessage = (pkg) => {
        try {
          console.log("Incoming:", pkg.data.toString());
          const { type, socketId, clientId, content } = JSON.parse(pkg.data.toString());
          emitAppEvent(type, content, { 
            socketId,
            clientId,
          });
        } catch (e) {
          emitAppEvent("LOG", e.message);
        }
      };
      this.$root.botwerkWsConnection = connection;
      this.isConnected = true;
    },
    disconnectWs() {
      console.log("Close");
      this.$root.botwerkWsConnection.close();
      this.$root.botwerkWsConnection = undefined;
      this.isConnected = false;
    },
  },
};
</script>

<template>
  <div class="panel">
    <h4>CONNECTION</h4>
    <label>WEBSOCKET</label>
    <input type="text" v-model="wsHost" />
    <button v-if="!isConnected" v-on:click="connectWs()">Connect</button>
    <button v-if="isConnected" v-on:click="disconnectWs()" class="red">
      Disconnect
    </button>
  </div>
</template>

<style scoped>
.panel {
  display: block;
  background: #222336;
  position: relative;
}

input[type="text"] {
  width: calc(100% - 30px);
}

button {
  width: 100%;
}
</style>
