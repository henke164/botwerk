<script setup>
import IconPanel from "./components/IconPanel.vue";
import SidePanel from "./components/SidePanel.vue";
import MainPanel from "./components/MainPanel.vue";
import { extensions } from "./extensions/extensions.jsx";
</script>

<script>
export default {
  data() {
    return {
      activeMenuIndex: 0,
      menuItems: extensions,
    };
  },
  methods: {
    handleMenuChanged(index) {
      this.activeMenuIndex = index;
      localStorage.setItem('activeMenuIndex', index);
    },
  },
  mounted() {
    const storedMenuIndex = localStorage.getItem('activeMenuIndex');
    if (storedMenuIndex) {
      this.activeMenuIndex = parseInt(storedMenuIndex);
    }
  }
};
</script>

<template>
  <main>
    <IconPanel
      :active-menu-index="activeMenuIndex"
      :menu-items="menuItems"
      :on-menu-changed="handleMenuChanged"
    ></IconPanel>
    <SidePanel
      :component="menuItems[activeMenuIndex].component"
    ></SidePanel>
    <MainPanel :views="getAvailableViews"></MainPanel>
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
