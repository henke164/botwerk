<script setup>
import DraggableComponent from "./DraggableComponent.vue";
</script>

<script>
export default {
  props: ["component"],
};
</script>

<template>
  <div class="side-panel">
    <component
      v-bind:is="component"
    ></component>
    <DraggableComponent
      :side="'right'"
      :min="150"
      :max="500"
    ></DraggableComponent>
  </div>
</template>

<style scoped>
.side-panel {
  width: 320px;
  height: 100vh;
  background: #222336;
  position: relative;
  padding: 0px 30px;
}

.drag-resize:hover {
  cursor: col-resize;
}
</style>
