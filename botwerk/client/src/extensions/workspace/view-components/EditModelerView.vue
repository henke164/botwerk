<script setup>
import CodeEditor from "simple-code-editor";
import TabBar from "../../../components/TabBar.vue";
import DraggableComponent from "../../../components/DraggableComponent.vue";
import { post } from "../../../services/apiService";
</script>
<script>
export default {
  props: ["params"],
  data() {
    return {
      modeler: {},
      ruleKey: null,
    };
  },
  watch: {
    params() {
      this.modeler = JSON.parse(JSON.stringify(this.params.modeler));
    },
  },
  methods: {
    async handleSave() {
      await post("/workspace/modeler", this.modeler);
      this.params.reload();
    },
    onTabSelected(index) {
      const tab = this.getTabs()[index];
      this.ruleKey = tab.ruleKey;
    },
    getTabs() {
      return [
        {
          title: "Create / Update Object Rules",
          ruleKey: "update",
        },
        {
          title: "Remove Object Rules",
          ruleKey: "remove",
        },
        {
          title: "Mapper",
          ruleKey: "map",
        },
      ];
    },
  },
  mounted() {
    this.modeler = JSON.parse(JSON.stringify(this.params.modeler));
    this.onTabSelected(0);
  },
};
</script>

<template>
  <div class="panel">
    <div class="left-bar" v-if="modeler">
      <h4>EDIT MODELER</h4>
      <div class="input-wrapper">
        <input type="text" v-model="modeler.name" />
      </div>
      <button v-on:click="handleSave">Save changes</button>

      <DraggableComponent
        :side="'right'"
        :min="150"
        :max="500"
      ></DraggableComponent>
    </div>
    <div class="right-bar">
      <TabBar :tabs="getTabs()" :onTabSelected="onTabSelected"></TabBar>
      <div class="editor-wrapper" v-if="modeler && ruleKey">
        <CodeEditor
          v-model="modeler.rules[ruleKey]"
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
