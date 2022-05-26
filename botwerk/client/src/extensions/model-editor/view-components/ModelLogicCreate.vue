<script setup>
import CodeInput from "../../../components/CodeInput.vue";
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
  <CodeInput :onSave="handleSave" :initialText="defaultText"></CodeInput>
</template>

<style scoped></style>
