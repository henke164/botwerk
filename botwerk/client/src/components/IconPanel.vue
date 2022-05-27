<script setup>
import BotwerkLogo from "../assets/img/logo.svg";
import MenuIcon from "./MenuIcon.vue";
</script>

<script>
export default {
  props: ["onMenuChanged", "menuItems", "activeMenuIndex"],
};
</script>

<template>
  <div class="icon-panel">
    <div class="logo" v-html="BotwerkLogo"></div>
    <MenuIcon
      v-for="(item, index) in menuItems"
      v-bind:key="index"
      class="menu-option"
      :icon="item.icon"
      :isActive="activeMenuIndex === index"
      v-on:click="() => onMenuChanged(index)"
    ></MenuIcon>
  </div>
</template>

<style scoped>
.icon-panel {
  width: 50px;
  height: 100vh;
  background: #2a2c3f;
  border-right: 1px solid #3f4455;
  text-align: center;
}

.logo {
  display: inline-block;
  margin-top: 10px;
  width: 40px;
  border-radius: 100%;
}
</style>
