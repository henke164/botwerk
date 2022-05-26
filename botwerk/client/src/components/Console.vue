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
    },
  },
  mounted() {
    addAppEventListener("SOCKET_CONNECTED", (id) => {
      this.websockets[id] = [];
    });

    addAppEventListener("SOCKET_DISCONNECTED", (id) => {
      delete this.websockets[id];
    });

    addAppEventListener("WEBSOCKET", (content) => {
      console.log(content);
      if (!this.websockets[content.id]) {
        this.websockets[content.id] = [];
      }
      this.websockets[content.id].push(
        `${
          content.dir === "IN"
            ? "<span style='color: #e14537'>▼</span>"
            : "<span style='color: #37e16d'>▲</span>"
        } ${JSON.stringify(content.pkg)}`
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
  <div class="console">
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
          v-on:click="() => (selectedLog = this.websockets[key])"
        >
          Websocket {{ index + 1 }}
        </a>
      </div>
      <div class="console-log-tools">
        <a
          class="icon"
          :style="`background-image: url(${ClearSvg})`"
          v-on:click="clearLog"
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
.console {
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
  color: white;
  background: none;
  border: none;
}

a.active {
  font-weight: bold;
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
