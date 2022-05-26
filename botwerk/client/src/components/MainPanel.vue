<script setup>
import Console from "./Console.vue";
</script>

<template>
  <div class="main-panel">
    <div class="main-content"></div>
    <Console></Console>
  </div>
</template>

<style scoped>
.main-panel {
  flex: 1;
  height: 100vh;
  background: #2a2c3f;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex-grow: 1;
  min-height: 50px;
  background: #2A2C3F;
  box-shadow: 1px -1px 1px #222336 inset;
}
</style>
