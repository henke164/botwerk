<script setup>
import IconPanel from "./components/IconPanel.vue";
import SidePanel from "./components/SidePanel.vue";
import MainPanel from "./components/MainPanel.vue";
import { extensions } from "./extensions/extensions.jsx";
import { connectWebsocket, defaultHost } from "./services/websocketService";
</script>

<script>
export default {
  data() {
    return {
      selectedExtensionIndex: 0,
      extensions,
    };
  },
  methods: {
    handleMenuChanged(index) {
      this.selectedExtensionIndex = index;
      localStorage.setItem("selectedExtensionIndex", index);
    },
  },
  mounted() {
    connectWebsocket(defaultHost);
    const storedMenuIndex = localStorage.getItem("selectedExtensionIndex");
    if (storedMenuIndex) {
      this.selectedExtensionIndex = parseInt(storedMenuIndex);
    }
  },
};
</script>

<template>
  <main>
    <IconPanel
      :active-menu-index="selectedExtensionIndex"
      :menu-items="extensions"
      :on-menu-changed="handleMenuChanged"
    ></IconPanel>
    <SidePanel
      :component="extensions[selectedExtensionIndex].component"
    ></SidePanel>
    <MainPanel :views="extensions[selectedExtensionIndex].views"></MainPanel>
  </main>
</template>

<style>
@import "./assets/base.css";

body {
  margin: 0;
}

main {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.resizable-content {
  height: 100%;
  width: 100%;
  background-color: aqua;
}
</style>
