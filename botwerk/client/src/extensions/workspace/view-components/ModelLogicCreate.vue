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
     }
  */

  return null;
}
`;

export default {
  data() {
    return {
      text: defaultText,
    }
  },
  methods: {
    handleKeyPress(ev) {
      console.log(ev);
      if (ev.key === 'Tab') {
        if (ev.shiftKey) {
          ev.preventDefault();
          return false;
        } else {
          document.execCommand('insertText', false, "  ");
          ev.preventDefault();
          return false;
        }
      }
    }
  }
};
</script>

<template>
  <div class="text-area-wrapper">
    <textarea ref="codeBlock" v-on:keydown="handleKeyPress" v-model="text"></textarea>
  </div>
</template>

<style scoped>
  .text-area-wrapper {
    display: flex;
    flex: 1;
  }
  textarea {
    flex: 1;
    display: block;
    padding: 10px;
    color: white;
    background: #2A2C3F;
    font-family: "Consolas";
    font-size: 12px;
  }
</style>