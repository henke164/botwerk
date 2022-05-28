<script setup>
import { addAppEventListener } from '../services/appEventHandler';
import Console from "./Console.vue";
</script>
<script>
export default {
  props: ["views"],
  data() {
    return {
      selectedView: null,
      viewParams: {},
    };
  },
  mounted() {
    addAppEventListener("SET_MAIN_PANEL_VIEW", (ev) => {
      if (!ev) {
        this.selectedView = null;
        this.viewParams = null;
        return;
      }
      this.selectedView = ev.extensionView;
      this.viewParams = ev.params;
    });
  },
};
</script>
<template>
  <div class="main-panel">
    <div class="main-content" v-if="views && Object.keys(views).length > 0">
      <div
        v-for="(viewKey, index) in Object.keys(views)"
        v-bind:key="index"
        :class="selectedView === viewKey ? 'view-component-wrapper' : ''"
      >
        <component
          v-if="selectedView === viewKey"
          v-bind:is="views[viewKey]"
          :params="this.viewParams"
        ></component>
      </div>
    </div>
    <div class="main-content" v-else></div>
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
  display: flex;
  flex: 1;
  min-height: 50px;
  background: #2A2C3F;
  box-shadow: 1px -1px 1px #222336 inset;
  flex-direction: column;
}

.view-component-wrapper {
  display: flex;
  flex: 1;
  max-height: 100%;
}

a:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
