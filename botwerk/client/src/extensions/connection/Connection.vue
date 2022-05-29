<script>
import {
  connectWebsocket,
  disconnectWebsocket,
  defaultHost,
  isConnected,
} from "../../services/websocketService";

export default {
  data() {
    return {
      wsHost: defaultHost,
      isConnected: isConnected(),
    };
  },
  methods: {
    connectWs() {
      this.isConnected = true;
      connectWebsocket(this.wsHost);
    },
    disconnectWs() {
      disconnectWebsocket(this.wsHost);
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
