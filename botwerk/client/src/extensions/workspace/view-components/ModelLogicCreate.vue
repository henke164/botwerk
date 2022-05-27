<script setup>
import CodeEditor from 'simple-code-editor';

</script>
<script>
export default {
  props: ["params"],
  data() {
    return {
      text: "",
    };
  },
  mounted() {
    console.log(this.params.modelerId);
  },
  methods: {
    handleSave(code) {
      console.log("code", code);
    },
  },
};
</script>

<template>
  <CodeEditor v-model="text" class="botwerk-code-editor"></CodeEditor>
</template>

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
  }

  .botwerk-code-editor .code_area {
    height: 100%;
    overflow: inherit !important;
  }
</style>
