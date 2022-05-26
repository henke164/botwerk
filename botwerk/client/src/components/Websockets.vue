<script setup>
import DraggableComponent from "./DraggableComponent.vue";
</script>

<template>
  <div class="console">
    <DraggableComponent
      class="drag-line"
      :side="'top'"
      :min="0"
      :max="1000"
    ></DraggableComponent>
    <div class="console-menu">
      <button>Clear</button>
    </div>
  </div>
</template>

<style scoped>
.console {
  color: white;
  background: #222336;
  position: relative;
  height: 400px;
}

.drag-line {
  position: absolute;
  right: 0;
}

.console-menu {
  border-top: 1px solid #2c3244;
  width: 100%;
  height: 35px;
  line-height: 35px;
  background: #2a2c3f;
}

button {
  margin-left: 10px;
  color: white;
  background: none;
  border: none;
}

button:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
