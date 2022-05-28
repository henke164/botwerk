<script setup>
import CodeEditor from "simple-code-editor";
import TabBar from "../../../components/TabBar.vue";
import DraggableComponent from "../../../components/DraggableComponent.vue";
import { get, post } from "../../../services/apiService";
import { emitAppEvent } from "../../../services/appEventHandler";
</script>
<script>
export default {
  props: ["params"],
  data() {
    return {
      client: null,
      clientId: null,
    };
  },
  watch: {
    params() {
      this.fetchClient();
    },
  },
  methods: {
    async fetchClient() {
      const { success, client } = await get(
        `/workspace/client/${this.params.client.id}`
      );

      if (!success) {
        return;
      }

      this.client = client;
    },
    async handleSave() {
      if (this.client.name.length === 0) {
        return;
      }

      await post("/workspace/modeler", this.client);
      emitAppEvent("LOG", `Successfully updated client: ${this.client.name}!`);
      this.params.reload();
    },
  },
  mounted() {
    this.fetchClient();
  },
};
</script>

<template>
  <div class="panel">
    <div class="left-bar" v-if="client">
      <h4>EDIT CLIENT</h4>
      <div class="input-wrapper">
        <input type="text" v-model="client.name" />
      </div>
      <button v-on:click="handleSave">Save changes</button>

      <DraggableComponent
        :side="'right'"
        :min="150"
        :max="500"
      ></DraggableComponent>
    </div>
    <div class="left-bar" v-if="client">
      <div class="header">Components</div>
      <DraggableComponent
        :side="'right'"
        :min="150"
        :max="500"
      ></DraggableComponent>
    </div>
    <div class="right-bar" v-if="client"></div>
  </div>
</template>

<style scoped>
input[type="text"] {
  flex: 1;
  width: 100%;
  border: 1px solid #595c76!important;
}

.input-wrapper {
  display: flex;
}

.header {
  margin-top: 20px;
}

.panel {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.left-bar {
  padding: 0px 20px;
  position: relative;
  min-width: 250px;
  flex-direction: column;
}

.right-bar {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.editor-wrapper {
  display: flex;
  flex: 1;
}
</style>
<style>
.botwerk-code-editor textarea {
  font-size: 12px !important;
}

.botwerk-code-editor .hljs {
  background: #222336 !important;
  font-size: 12px !important;
}

.botwerk-code-editor .header {
  display: none;
}

.botwerk-code-editor .hljs-comment {
  color: #6a9955;
}

.botwerk-code-editor.code_editor {
  height: auto;
  flex: 1;
  background: #222336 !important;
  overflow-y: scroll !important;
  border-radius: 0px !important;
}

.botwerk-code-editor .code_area {
  height: 100%;
  overflow: inherit !important;
}
</style>
