<script>
export default {
  props: ["tabs"],
  data() {
    return {
      selectedTab: 0,
    };
  },
};
</script>
<template>
  <div class="tab-wrapper">
    <a
      v-for="(t, index) in tabs.map(v => v.title)"
      v-bind:key="index"
      v-on:click="() => (selectedTab = index)"
      class="tab"
      >{{ t }}</a
    >
  </div>
</template>

<style scoped>
.tab-wrapper {
  background: #222336;
  height: 30px;
}

.tab {
  font-size: 12px;
  display: inline-block;
  border-left: 1px solid #3f4455;
  border-right: 1px solid #3f4455;
  min-width: 100px;
  line-height: 30px;
  vertical-align: bottom;
  text-align: center;
}

a:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
