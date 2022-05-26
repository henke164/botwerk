<script setup>
import { nextTick } from "vue";
import ProfileSvg from "../icons/profile.svg";
</script>

<script>
export default {
  props: ["onCancel", "onEnter", "inputError"],
  data() {
    return {
      newProfileName: "",
    };
  },
  methods: {
    handleNewProfileKeyDown(e) {
      if (e.key.toLowerCase() !== 'enter') {
        return;
      }

      const { value } = this.$refs.newProfileInput;
      if (value.length === 0) {
        this.onCancel();
        return;
      }

      this.onEnter(value);
    },
    handleNewProfileKeyUp(e) {
      if (e.srcElement.value.length > 20) {
        e.srcElement.value = e.srcElement.value.substr(0, 5);
        return;
      }
    },
  },
  mounted() {
    nextTick(() => {
      this.$refs.newProfileInput.focus();
    });  
  }
};
</script>

<template>
  <div>
    <span
      class="icon"
      :style="`background-image: url(${ProfileSvg})`"
    ></span>
    <input
      ref="newProfileInput"
      v-on:blur="onCancel"
      v-on:keydown="handleNewProfileKeyDown"
      v-on:keyup="handleNewProfileKeyUp"
      :class="inputError !== null ? 'has-error' : ''"
      type="text"
    />
    <span class="input-error">{{inputError}}</span>
  </div>
</template>

<style scoped>
input[type="text"] {
  display: inline-block;
  margin: 5px;
  padding: 5px;
}

input[type="text"].has-error {
  box-shadow: inset 0 1px 2px #e14537;
}

.input-error {
  font-size: 12px;
  color: #e14537;
}
</style>
