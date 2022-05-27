<script setup>
import CodeEditor from 'simple-code-editor';

</script>
<script>
const defaultText = `/*
  Define your model type here based on the packet content. 
*/

function onSocketPacketReceived(socketIndex, packet) {
  /*
     Example:
     if (socketIndex === 0) {
        const { type, data } = JSON.parse(packet);
        if (type === "user_data") {
            return "User"
        }

        if (type === "user_data") {
            return "User"
        }
        function hej() {
          
        }
     }
  */

  return null;
}

function onSocketPacketReceived(socketIndex, packet) {
  /*
     Example:
     if (socketIndex === 0) {
        const { type, data } = JSON.parse(packet);
        if (type === "user_data") {
            return "User"
        }

        if (type === "user_data") {
            return "User"
        }
     }
  */

  return null;
}
`;

export default {
  data() {
    return {
      text: defaultText,
    };
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
