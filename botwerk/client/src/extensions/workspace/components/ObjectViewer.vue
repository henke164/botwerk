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
      tabIndex: 0,
      clientId: null,
      objectId: null,
      appearanceHTML: null,
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
      const res = await get(
        `/workspace/object/${this.params.clientId}/${this.params.objectId}`,
      );

      if (!res.success) {
        return;
      }

      this.objectCode = JSON.stringify(res.object, null, 2);
      this.appearanceHTML = res.appearanceHTML;
    },
    getTabs() {
      return [
        {
          title: "Visual",
        },
        {
          title: "Code",
        },
      ];
    },
    onTabSelected(tab) {
      this.tabIndex = tab;
    },
  },
  mounted() {
    this.fetchObject();
  },
};
</script>

<template>
  <div class="panel">
    <div id="object-viewer" class="left-bar" v-if="objectCode">
      <h4>OBJECT VIEWER</h4>
      <DraggableComponent
        :side="'right'"
        :min="150"
        :max="500"
      ></DraggableComponent>
    </div>
    <div class="right-bar flex" v-if="objectCode">
      <TabBar :tabs="getTabs()" :onTabSelected="onTabSelected"></TabBar>
      <div class="html-wrapper flex" v-if="tabIndex === 0">
        <div v-html="appearanceHTML"></div>
      </div>
      <div class="code-wrapper flex" v-if="tabIndex === 1">
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

.html-wrapper {
  position: relative;
  max-height: calc(100% - 50px);
  overflow-y: scroll;
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
