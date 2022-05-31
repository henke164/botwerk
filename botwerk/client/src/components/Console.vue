<script setup>
import DraggableComponent from "./DraggableComponent.vue";
import { addAppEventListener } from "../services/appEventHandler";
import ClearSvg from "../assets/img/clear.svg";
</script>
<script>
export default {
  data() {
    return {
      selectedLogId: "OUTPUT",
      output: [],
      selectedLog: [],
      websockets: {},
    };
  },
  methods: {
    clearLog() {
      if (this.selectedLogId === "OUTPUT") {
        this.output = [];
      } else {
        this.websockets[this.selectedLogId] = [];
      }
      this.selectedLog = [];

    },
  },
  mounted() {
    addAppEventListener("SOCKET_CONNECTED", (content, options) => {
      const { clientId, socketIndex } = options;
      this.websockets[socketIndex] = [`Socket ${socketIndex} connected`];
    });

    addAppEventListener("MESSAGE_RECEIVED", (content, options) => {
      const { clientId, socketIndex } = options;
      if (!this.websockets[socketIndex]) {
        this.websockets[socketIndex] = [];
      }
      this.websockets[socketIndex].push(
        `<span style='color: #e14537'>▼</span> ${JSON.stringify(content)}`
      );
    });

    addAppEventListener("MESSAGE_SENT", (content, options) => {
      const socketIndex = options.socketIndex;

      if (!this.websockets[socketIndex]) {
        this.websockets[socketIndex] = [];
      }
      this.websockets[socketIndex].push(
        `<span style='color: #77C66E'>▲</span> ${JSON.stringify(content)}`
      );
    });

    addAppEventListener("LOG", (content) => {
      this.output.push(content);
    });

    this.selectedLog = this.output;
  },
};
</script>

<template>
  <div id="console">
    <DraggableComponent
      class="drag-line"
      :side="'top'"
      :min="100"
      :max="1000"
    ></DraggableComponent>
    <div class="console-menu">
      <a
        @click="selectedLog = this.output"
        :class="selectedLog === this.output ? 'active' : ''"
      >
        Output
      </a>
      <div class="websockets-options">
        <a
          v-for="(key, index) in Object.keys(websockets)"
          v-bind:key="index"
          data-toggle="tooltip"
          :title="socket"
          :class="selectedLog === this.websockets[key] ? 'active' : ''"
          v-on:click="() => {
            selectedLogId = key;
            selectedLog = this.websockets[key];
          }"
        >
          Websocket {{ index + 1 }}
        </a>
      </div>
      <div class="console-log-tools">
        <a
          class="icon"
          v-on:click="clearLog"
          v-html="ClearSvg"
        ></a>
      </div>
    </div>
    <div class="console-output">
      <span
        v-for="(text, idx) in this.selectedLog"
        v-bind:key="idx"
        v-html="text"
      ></span>
    </div>
  </div>
</template>

<style scoped>
#console {
  display: flex;
  flex-direction: column;
  color: white;
  background: #222336;
  position: relative;
  height: 400px;
  font-size: 12px;
}

.drag-line {
  position: absolute;
  right: 0;
}

.console-menu {
  border-top: 1px solid #2c3244;
  width: 100%;
  height: 35px;
  line-height: 35px;
  background: #2a2c3f;
}

.console-output {
  font-family: "Consolas";
  font-size: 12px;
  padding: 20px;
  overflow-y: scroll;
  flex: 1;
  color: rgb(162, 163, 189);
}

.console-output span {
  display: block;
}

a {
  margin-left: 10px;
  color: #ccc;
  background: none;
  border: none;
}

a.active {
  font-weight: bolder;
  color: white;
}

a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.websockets-options {
  display: inline-block;
  max-width: 80%;
}

.console-log-tools {
  float: right;
  margin-right: 10px;
}
</style>
