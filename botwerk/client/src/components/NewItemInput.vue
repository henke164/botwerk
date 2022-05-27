<script setup>
import { nextTick } from "vue";
</script>

<script>
export default {
  props: ["icon", "maxLength", "onCancel", "onEnter", "inputError"],
  data() {
    return {
      name: "",
    };
  },
  methods: {
    handleKeyDown(e) {
      if (e.key.toLowerCase() !== "enter") {
        return;
      }

      const { value } = this.$refs.input;
      if (value.length === 0) {
        this.onCancel();
        return;
      }

      this.onEnter(value);
    },
    handleKeyUp(e) {
      if (e.srcElement.value.length > this.maxLength) {
        e.srcElement.value = e.srcElement.value.substr(0, this.maxLength);
        return;
      }
    },
  },
  mounted() {
    nextTick(() => {
      this.$refs.input.focus();
    });
  },
};
</script>

<template>
  <div>
    <span class="icon" v-html="icon"></span>
    <input
      ref="input"
      v-on:blur="onCancel"
      v-on:keydown="handleKeyDown"
      v-on:keyup="handleKeyUp"
      :class="inputError !== null ? 'has-error' : ''"
      type="text"
    />
    <span class="input-error">{{ inputError }}</span>
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
