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
      availableViews: [],
    };
  },
  computed: {
    getAvailableViews() {
      console.log('compute', this.availableViews);
      if (!this.availableViews) {
        return [];
      }
      const views = this.menuItems[this.activeMenuIndex].views;
      return views.filter((v, index) => this.availableViews.includes(index));
    },
  },
  methods: {
    setAvailableViews(indexes) {
      this.availableViews = indexes;
    },
    handleMenuChanged(index) {
      this.activeMenuIndex = index;
    },
  },
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
      :setAvailableViews="setAvailableViews"
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
