<script>
export default {
  props: ["icon", "isActive"],
};
</script>

<template>
  <a
    v-html="icon"
    :class="this.isActive ? 'active' : ''"
  ></a>
</template>

<style scoped>
a {
  display: inline-block;
  background-size: 100%;
  margin-top: 30px;
  width: 30px;
  height: 30px;
}

a:hover {
  cursor: pointer;
}
</style>

<style>
a.menu-option svg {
  fill: #777;
}

a.menu-option.active svg {
  fill: white;
}
</style>