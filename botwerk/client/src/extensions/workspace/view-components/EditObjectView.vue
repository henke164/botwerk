<script setup>
import CodeEditor from "simple-code-editor";
import TabBar from "../../../components/TabBar.vue";
import DraggableComponent from "../../../components/DraggableComponent.vue";
import { get } from "../../../services/apiService";
</script>
<script>
export default {
  props: ["params"],
  data() {
    return {
      clientId: null,
      objectId: null,
      objectCode: null,
    };
  },
  watch: {
    params() {
      this.fetchObject();
    },
  },
  methods: {
    async fetchObject() {
      const { success, object } = await get(
        `/workspace/object/${this.params.clientId}/${this.params.objectId}`
      );

      if (!success) {
        return;
      }

      this.objectCode = JSON.stringify(object, null, 2);
    },
    async handleSave() {
      this.params.reload();
    },
  },
  mounted() {
    this.fetchObject();
  },
};
</script>

<template>
  <div class="panel">
    <div class="left-bar" v-if="objectCode">
      <h4>OBJECT VIEWER</h4>
      <button v-on:click="handleSave">Save changes</button>

      <DraggableComponent
        :side="'right'"
        :min="150"
        :max="500"
      ></DraggableComponent>
    </div>
    <div class="right-bar" v-if="objectCode">
      <div class="editor-wrapper">
        <CodeEditor
          v-model="objectCode"
          class="botwerk-code-editor"
        ></CodeEditor>
      </div>
    </div>
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
  overflow-y: scroll;
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
