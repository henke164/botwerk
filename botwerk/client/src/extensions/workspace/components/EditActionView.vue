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
      action: null,
      tabIndex: 0,
    };
  },
  watch: {
    params() {
      this.fetchAction();
    },
  },
  methods: {
    async fetchAction() {
      const { success, action } = await get(
        `/workspace/action/${this.params.action.id}`
      );

      if (!success) {
        return;
      }

      this.action = action;
      console.log(this.action);
    },
    async handleSave() {
      if (this.action.name.length === 0) {
        return;
      }

      await post("/workspace/action", this.action);
      emitAppEvent("LOG", `Successfully updated action: ${this.action.name}!`);
      this.params.reload();
    },
    onTabSelected(index) {
      this.tabIndex = index;
    },
    getTabs() {
      return [
        {
          title: "Trigger",
        },
        {
          title: "Action",
        },
      ];
    }
  },
  mounted() {
    this.fetchAction().then(() => {
      this.onTabSelected(0);
    });
  },
};
</script>

<template>
  <div class="panel">
    <div id="edit-action" class="left-bar" v-if="action">
      <h4>EDIT ACTION</h4>
      <div class="input-wrapper">
        <input type="text" v-model="action.name" />
      </div>
      <button v-on:click="handleSave">Save changes</button>

      <DraggableComponent
        :side="'right'"
        :min="150"
        :max="500"
      ></DraggableComponent>
    </div>
    <div class="right-bar flex" v-if="action">
      <TabBar :tabs="getTabs()" :onTabSelected="onTabSelected"></TabBar>
      <div class="code-wrapper flex">
        <CodeEditor
          v-if="tabIndex === 0"
          v-model="action.trigger"
          class="botwerk-code-editor"
        ></CodeEditor>
        <CodeEditor
          v-if="tabIndex === 1"
          v-model="action.code"
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
  border: 1px solid #595c76 !important;
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
  width: 150px;
  flex-direction: column;
}

.flex {
  display: flex;
  flex: 1;
}

.code-wrapper {
  max-height: calc(100% - 50px);
  overflow-y: scroll;
}
</style>
<style>
.botwerk-code-editor textarea {
  font-size: 12px !important;
  overflow: auto !important;
}

.botwerk-code-editor .hljs {
  background: #222336 !important;
  font-size: 12px !important;
}

.botwerk-code-editor .hljs-comment {
  color: #6a9955;
}

.botwerk-code-editor.code_editor {
  height: auto;
  flex: 1;
  background: #222336 !important;
  overflow: hidden !important;
  border-radius: 0px !important;
}

.botwerk-code-editor .code_area {
  height: 100%;
  overflow: inherit !important;
}
</style>
