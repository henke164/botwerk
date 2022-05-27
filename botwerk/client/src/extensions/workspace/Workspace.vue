<script setup>
import ClientEditor from "./ClientEditor.vue";
import ModelerEditor from "./ModelerEditor.vue";
import { get } from "../../services/apiService";
import { emitAppEvent } from "../../services/appEventHandler";
</script>

<script>
export default {
  data() {
    return {
      workspace: {},
      showNewClientInput: false,
      newClientInputError: null,
      expanded: {},
    };
  },
  mounted() {
    get("/workspace").then(({ success, workspace }) => {
      if (success) {
        this.workspace = workspace;
      } else {
        emitAppEvent("LOG", "Failed to load workspace");
      }
    });
  },
};
</script>

<template>
  <div class="panel">
    <h4>WORKSPACE</h4>
    <ClientEditor :clients="this.workspace.clients" />
    <ModelerEditor />
  </div>
</template>

<style scoped>
.panel {
  display: block;
  background: #222336;
  position: relative;
}

input[type="text"] {
  margin-top: 5px;
  padding: 5px;
}

button {
  width: 100%;
}

a {
  color: white;
}

.clients {
  margin-top: 10px;
  font-size: 12px;
  line-height: 20px;
}

.clients .icon {
  margin: 5px;
  width: 15px;
  height: 15px;
}

.client-content-row {
  padding-left: 10px;
}

.client-content-child-row {
  padding-left: 25px;
}

.header {
  display: flex;
}

.tools {
  flex: 1;
  text-align: right;
}

.list-item-text {
  flex: 1;
  font-weight: bolder;
  line-height: 25px;
  vertical-align: middle;
}

.list-item {
  display: flex;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.list-item:hover {
  background: #2a2c3f;
  cursor: pointer;
}
</style>
