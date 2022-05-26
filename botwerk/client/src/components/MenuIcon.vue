<script>
export default {
  props: ["icon", "isActive"],
};
</script>

<template>
  <span
    :style="`background-image: url(${icon})`"
    :class="this.isActive ? 'active' : ''"
  ></span>
</template>

<style scoped>
span {
  display: inline-block;
  background-size: 100%;
  margin-top: 30px;
  width: 30px;
  height: 30px;
  filter: opacity(1) invert(1) saturate(0) hue-rotate(150deg) contrast(3)
    brightness(0.6);
}

span.active {
  filter: opacity(1) invert(1) saturate(0) hue-rotate(150deg) contrast(3)
    brightness(1);
}

span:hover {
  filter: opacity(1) invert(1) saturate(0) hue-rotate(150deg) contrast(3)
    brightness(1);
}

span:hover {
  cursor: pointer;
}
</style>
