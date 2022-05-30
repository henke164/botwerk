<script setup>
import CodeEditor from "simple-code-editor";
import DraggableComponent from "../../../components/DraggableComponent.vue";
</script>
<script>
export default {
  props: ["appearanceHTML", "onChanged"],
  data() {
    return {
      html: "",
    };
  },
  mounted() {
    this.html = this.appearanceHTML || "";
  },
  methods: {
    onHtmlChanged() {
      this.onChanged(this.html);
    },
  },
};
</script>

<template>
  <div ref="visualizer" class="visualizer">
    <div id="html-viewer">
      <div v-html="html"></div>
      <DraggableComponent
        :side="'right'"
        :min="150"
        :max="800"
      ></DraggableComponent>
    </div>
    <div class="code-editor">
      <CodeEditor
        width="100%"
        height="100%"
        class="botwerk-code-editor"
        v-model="html"
        v-on:keyup="onHtmlChanged"
        :languages="[['html', 'HTML']]"
      ></CodeEditor>
    </div>
  </div>
</template>

<style scoped>
.visualizer {
  flex: 1;
  background: #222336;
  display: flex;
  flex-direction: row;
}

.code-editor {
  width: 150px;
  flex: 1;
}

#html-viewer {
  min-width: 150px;
  position: relative;
  flex: 1;
  color: black;
  overflow-y: scroll;
}

.code-viewer {
  flex: 1;
  max-height: 100%;
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
